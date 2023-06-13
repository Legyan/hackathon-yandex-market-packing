import numpy as np
import pandas as pd
import json
import pickle
import copy

def predict(dictionary):
    answer = dict()
    answer['orderkey'] = dictionary['orderkey']
    all_packs = ['YMA', 'YMC', 'YME', 'YMF', 'YMG', 'YML', 'YMU', 'YMV',
                 'YMW', 'MYF', 'YMX', 'MYA', 'MYB', 'MYC', 'MYD', 'MYE']
    
    items_to_pack = []
    nonpack = []
    stretch = []
    for el in dictionary['items']:
        if '340' in el['type']:
            nonpack.append(el)
        elif '360' in el['type']:
            stretch.append(el)
        else:
            items_to_pack.append(el)
    d = dict()
    nonpack_dict = dict()
    stretch_dict = dict()
    d['items'] = items_to_pack
    if len(nonpack) > 0:
        nonpack_dict = {'cartontype': 'NONPACK', 'goods': [x['sku'] for x in nonpack]}
    if len(stretch) > 0:
        stretch_dict = {'cartontype': 'STRETCH', 'goods': [x['sku'] for x in stretch]}
    
    if len(items_to_pack) == 0:
        if len(nonpack) == 0 and len(stretch) > 0:
            answer['recommendations'] = [[stretch_dict]]
            answer['status'] = 'ok'
            return answer
        if len(stretch) == 0 and len(nonpack) > 0:
            answer['recommendations'] = [[nonpack_dict]]
            answer['status'] = 'ok'
            return answer
        if len(nonpack) > 0 and len(stretch) > 0:
            answer['recommendations'] = [[nonpack_dict, stretch_dict]]
            answer['status'] = 'ok'
            return answer
    
    cnt = 0
    for item in d['items']:
        cnt += item['count']

    if cnt > 5:
        answer['status'] = 'fallback'
        return answer
    
    elif cnt == 1:
        with open('sku_pack_dict.json') as f:
            sku_pack_dict = json.load(f)
        
        if d['items'][0]['sku'] in sku_pack_dict:
            answer['recommendations'] = [[{'cartontype': sku_pack_dict[d['items'][0]['sku']], 'goods': [d['items'][0]['sku']]}]]
            answer['status'] = 'ok'
            return answer
        
        elif not (d['items'][0]['size1'] and d['items'][0]['size2'] and d['items'][0]['size3']):
            answer['status'] = 'fallback'
            return answer

        else:
            carton_edited = pd.read_csv('carton_edited.csv')
            valid_pack = []
            for pack in all_packs:
                if (np.min([float(d['items'][0]['size1']), float(d['items'][0]['size2']), float(d['items'][0]['size3'])]) < np.min(carton_edited.loc[carton_edited['CARTONTYPE'] == pack,['LENGTH', 'WIDTH', 'HEIGHT']].values)
                    and np.max([float(d['items'][0]['size1']), float(d['items'][0]['size2']), float(d['items'][0]['size3'])]) < np.max(carton_edited.loc[carton_edited['CARTONTYPE'] == pack,['LENGTH', 'WIDTH', 'HEIGHT']].values)
                    and np.median([float(d['items'][0]['size1']), float(d['items'][0]['size2']), float(d['items'][0]['size3'])]) < np.median(carton_edited.loc[carton_edited['CARTONTYPE'] == pack,['LENGTH', 'WIDTH', 'HEIGHT']].values)):
                    valid_pack.append(pack)
            if len(valid_pack) == 0:
                answer['status'] = 'fallback'
                return answer

            alternatives = (carton_edited.loc[carton_edited['CARTONTYPE'].isin(valid_pack), ['CARTONTYPE', 'price']]
                                         .sort_values('price')['CARTONTYPE']
                                         .tolist()[:3])
            
            recommendations = []
            for pack in alternatives:
                one_rec = []
                one_rec.append({'cartontype': pack, 'goods': [x['sku'] for x in d['items']]})
                if len(nonpack_dict) > 0:
                    one_rec.append(nonpack_dict)
                if len(stretch_dict) > 0:
                    one_rec.append(stretch_dict)
                recommendations.append(one_rec)

            answer['recommendations'] = recommendations
            answer['status'] = 'ok'
            return answer

    else:
        for item in d['items']:
            if item['size1'] is None or item['size2'] is None or item['size3'] is None or item['weight'] is None:
                answer['status'] = 'fallback'
                return answer

        data = []
        for item in d['items']:
            count = item['count']
            size1 = float(item['size1'])
            size2 = float(item['size2'])
            size3 = float(item['size3'])
            weight = float(item['weight'])
            volume = size1 * size2 * size3
            data.extend([size1, size2, size3, volume, weight] * count)
        if len(data) < 25:
            data.extend([0] * (25-len(data)))
        with open('model.pcl', 'rb') as fid:
            model = pickle.load(fid)
        
        probs = model.predict_proba(np.array(data).reshape(1, -1))[0]
        ind = np.argsort(probs)[::-1][:3]
        recommendations = []
        for pack in model.classes_[ind]:
            one_rec = []
            if pack == 'NONPACK' and len(nonpack_dict) > 0:
                tmp_dict = copy.deepcopy(nonpack_dict)
                tmp_dict['goods'] += [x['sku'] for x in d['items']]
                recommendations.append(tmp_dict)
                if len(stretch_dict) > 0:
                    one_rec.append(stretch_dict)
            elif pack == 'NONPACK' and len(nonpack_dict) == 0:
                one_rec.append({'cartontype': 'NONPACK', 'goods': [x['sku'] for x in d['items']]})
                if len(stretch_dict) > 0:
                    one_rec.append(stretch_dict)
            if pack == 'STRETCH' and len(stretch_dict) > 0:
                tmp_dict = copy.deepcopy(stretch_dict)
                tmp_dict['goods'] += [x['sku'] for x in d['items']]
                recommendations.append(tmp_dict)
                if len(nonpack_dict) > 0:
                    one_rec.append(nonpack_dict)
            elif pack == 'STRETCH' and len(stretch_dict) == 0:
                one_rec.append({'cartontype': 'STRETCH', 'goods': [x['sku'] for x in d['items']]})
                if len(nonpack_dict) > 0:
                    one_rec.append(nonpack_dict)
            if pack != 'NONPACK' and pack != 'STRETCH':
                one_rec.append({'cartontype': pack, 'goods': [x['sku'] for x in d['items']]})
                if len(nonpack_dict) > 0:
                    one_rec.append(nonpack_dict)
                if len(stretch_dict) > 0:
                    one_rec.append(stretch_dict)
            recommendations.append(one_rec)


        answer['recommendations'] = recommendations
        answer['status'] = 'ok'
        return answer