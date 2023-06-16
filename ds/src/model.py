import numpy as np
import pandas as pd
import json
import pickle
import copy

def predict(dictionary):
    """
    Принимает на вход информацию о заказе в виде словаря со следующими ключами:
    'orderId' : str,
    'items': List[{'sku': str,
                   'count': int,
                   'size1': Optional[str] = None,
                   'size2': Optional[str] = None,
                   'size3': Optional[str] = None,
                   'weight': Optional[str] = None,
                   'type': List[str]
                 }]
    Делает предсказание подходящей упаковки по следующему алгоритму:
    1. проверяет карготипы товаров, если находит карготип 340 или 360, то для
      этого sku вернет рекомендацию упаковки NONPACK или STRETCH;
    2. для остальных товаров:
        2.1. сначала проверит количество товаров, если 1 товар:
          2.1.1. проверит есть ли статистика по упаковке товара в словаре 
                 sku_pack_dict и вернет рекомендацию на основе статистики;
          2.1.2. если статистики нет, проверит указаны ли линейные размеры товара,
                 если не указаны, то возвращает 'status': 'fallback';
          2.1.3. если указаны:
              a. сравнит линейные размеры товара и всех коробок, добавит
                 подходящие коробки в список valid_pack;
              b. сравнит длину товара и пакета, диагональ меньшей грани товара с
                 диаметром окружности раскрытого пакета, добавит подходящие
                 пакеты в список valid_pack;
              c. сравнит линейные размеры товара и оставшихся пакетов, добавит
                 подходящие пакеты в список valid_pack;
              d. если в valid_pack нет вариантов упаковки, возвращает
                 'status': 'fallback';
              e. если есть, возвращает топ-3 (при наличии) самых дешевых вариантов
                 упаковки из valid_pack.
        2.2. если 2-5 товаров:
          2.2.1. проверяет для всех ли товаров указаны линейные размеры и вес, если
                 нет, то возвращает 'status': 'fallback';
          2.2.2. если указаны для всех, делает предсказание с помощью алгоритма
                 градиентного бустинга и возвращает три наиболее вероятные по
                 мнению модели варианта упаковки.
        2.3. если больше 5 товаров - возвращает 'status': 'fallback'.
    """
    answer = dict()
    answer['orderkey'] = dictionary['orderId']
    boxes = ['YMA', 'YMC', 'YME', 'YMF', 'YMG', 'YML',
             'YMU', 'YMV', 'YMW', 'MYF', 'YMX']
    bags = ['MYA', 'MYB', 'MYC', 'MYD', 'MYE']
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
        nonpack_dict = {'cartontype': 'NONPACK',
                        'goods': [x['sku'] for x in nonpack]}
    if len(stretch) > 0:
        stretch_dict = {'cartontype': 'STRETCH',
                        'goods': [x['sku'] for x in stretch]}
    
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
            answer['recommendations'] = [[{'cartontype': sku_pack_dict[d['items'][0]['sku']],
                                           'goods': [d['items'][0]['sku']]}]]
            answer['status'] = 'ok'
            return answer
        
        elif not (d['items'][0]['size1']
                  and d['items'][0]['size2']
                  and d['items'][0]['size3']):
            answer['status'] = 'fallback'
            return answer

        else:
            carton_edited = pd.read_csv('carton_edited.csv')
            valid_pack = []
            size1 = float(d['items'][0]['size1'])
            size2 = float(d['items'][0]['size2'])
            size3 = float(d['items'][0]['size3'])
            for pack in boxes:
                if (np.min([size1, size2, size3])
                    < np.min(carton_edited.loc[carton_edited['CARTONTYPE'] == pack,
                                               ['LENGTH', 'WIDTH', 'HEIGHT']].values)
                    and np.max([size1, size2, size3])
                    < np.max(carton_edited.loc[carton_edited['CARTONTYPE'] == pack,
                                               ['LENGTH', 'WIDTH', 'HEIGHT']].values)
                    and np.median([size1, size2, size3])
                    < np.median(carton_edited.loc[carton_edited['CARTONTYPE'] == pack,
                                                  ['LENGTH', 'WIDTH', 'HEIGHT']].values)):
                    valid_pack.append(pack)
            for pack in bags:
                if (1.2 * np.max([size1, size2, size3])
                    < carton_edited.loc[carton_edited['CARTONTYPE'] == pack, 'WIDTH'].values[0]
                    and 1.1 * np.sqrt(np.min([size1, size2, size3])**2 + np.median([size1, size2, size3])**2)
                    < 2 * carton_edited.loc[carton_edited['CARTONTYPE'] == pack, 'LENGTH'].values[0] / np.pi):
                    valid_pack.append(pack)
            for pack in bags:
                if (not pack in valid_pack and np.min([size1, size2, size3])
                    < np.min(carton_edited.loc[carton_edited['CARTONTYPE'] == pack,
                                               ['LENGTH', 'WIDTH', 'HEIGHT']].values)
                    and np.max([size1, size2, size3])
                    < np.max(carton_edited.loc[carton_edited['CARTONTYPE'] == pack,
                                               ['LENGTH', 'WIDTH', 'HEIGHT']].values)
                    and np.median([size1, size2, size3])
                    < np.median(carton_edited.loc[carton_edited['CARTONTYPE'] == pack,
                                                  ['LENGTH', 'WIDTH', 'HEIGHT']].values)):
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
                one_rec.append({'cartontype': pack,
                                'goods': [x['sku'] for x in d['items']]})
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
            if (item['size1'] is None
                or item['size2'] is None
                or item['size3'] is None
                or item['weight'] is None):
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
                one_rec.append({'cartontype': 'NONPACK',
                                'goods': [x['sku'] for x in d['items']]})
                if len(stretch_dict) > 0:
                    one_rec.append(stretch_dict)
            if pack == 'STRETCH' and len(stretch_dict) > 0:
                tmp_dict = copy.deepcopy(stretch_dict)
                tmp_dict['goods'] += [x['sku'] for x in d['items']]
                recommendations.append(tmp_dict)
                if len(nonpack_dict) > 0:
                    one_rec.append(nonpack_dict)
            elif pack == 'STRETCH' and len(stretch_dict) == 0:
                one_rec.append({'cartontype': 'STRETCH',
                                'goods': [x['sku'] for x in d['items']]})
                if len(nonpack_dict) > 0:
                    one_rec.append(nonpack_dict)
            if pack != 'NONPACK' and pack != 'STRETCH':
                one_rec.append({'cartontype': pack,
                                'goods': [x['sku'] for x in d['items']]})
                if len(nonpack_dict) > 0:
                    one_rec.append(nonpack_dict)
                if len(stretch_dict) > 0:
                    one_rec.append(stretch_dict)
            recommendations.append(one_rec)

        answer['recommendations'] = recommendations
        answer['status'] = 'ok'
        return answer