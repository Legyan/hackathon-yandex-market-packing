import numpy as np
import pandas as pd
import json
import pickle
import lightgbm

def predict(d):
    cnt = 0
    all_packs = ['YMA', 'YMC', 'YME', 'YMF', 'YMG', 'YML', 'YMU', 'YMV',
                 'YMW', 'MYF', 'YMX', 'MYA', 'MYB', 'MYC', 'MYD', 'MYE']
    for item in d['items']:
        cnt += item['count']
    if cnt > 5:
        return {'orderkey': d['orderId'],
                'status': 'fallback'}
    elif cnt == 1:
        with open('sku_pack_dict.json') as f:
            sku_pack_dict = json.load(f)
        if d['items'][0]['type'][0] == '340':
            return {'orderkey': d['orderId'], 
                    'package': [{'cartontype': 'NONPACK', 'goods': [d['items'][0]['sku']]}],
                    'status': 'ok'
                    }
        elif d['items'][0]['type'][0] == '360':
            return {'orderkey': d['orderId'],
                    'package': [{'cartontype': 'STRETCH', 'goods': [d['items'][0]['sku']]}],
                    'status': 'ok'
                    }
        elif d['items'][0]['sku'] in sku_pack_dict:
            return {'orderkey': d['orderId'],
                    'package': [{'cartontype': sku_pack_dict[d['items'][0]['sku']], 'goods': [d['items'][0]['sku']]}],
                    'status': 'ok'
                    }
        else:
            carton_edited = pd.read_csv('carton_edited.csv')
            valid_pack = []
            for pack in all_packs:
                if (np.min([float(d['items'][0]['size1']), float(d['items'][0]['size2']), float(d['items'][0]['size2'])]) < np.min(carton.loc[carton['CARTONTYPE'] == pack,['LENGTH', 'WIDTH', 'HEIGHT']].values)
                    and np.max([float(d['items'][0]['size1']), float(d['items'][0]['size2']), float(d['items'][0]['size2'])]) < np.max(carton.loc[carton['CARTONTYPE'] == pack,['LENGTH', 'WIDTH', 'HEIGHT']].values)
                    and np.median([float(d['items'][0]['size1']), float(d['items'][0]['size2']), float(d['items'][0]['size2'])]) < np.median(carton.loc[carton['CARTONTYPE'] == pack,['LENGTH', 'WIDTH', 'HEIGHT']].values)
                    ):
                    valid_pack.append(pack)
                if len(pack) == 0:
                    return {'orderkey': d['orderId'],
                            'status': 'fallback'}
                
                pack_to_return = (carton_edited.loc[carton_edited['CARTONTYPE'].isin(all_packs), ['CARTONTYPE', 'price']]
                                            .sort_values('price')['CARTONTYPE']
                                            .tolist()[0])
            return {'orderkey': d['orderId'],
                    'package': [{'cartontype': pack_to_return, 'goods': [d['items'][0]['sku']]}],
                    'status': 'ok'
                    }
    else:    
        result = []
        for item in d['items']:
            count = item['count']
            size1 = float(item['size1'])
            size2 = float(item['size2'])
            size3 = float(item['size3'])
            weight = float(item['weight'])
            volume = size1 * size2 * size3
            result.extend([size1, size2, size3, volume, weight] * count)
        if len(result) < 25:
            result.extend([0] * (25-len(result)))
        with open('model.pcl', 'rb') as fid:
            model = pickle.load(fid)
        prediction = model.predict(np.array(result).reshape(1, -1))[0]
        return {'orderkey': d['orderId'],
                'package': [{'cartontype': prediction, 'goods': [x['sku'] for x in d['items']]}],
                'status': 'ok'
                }