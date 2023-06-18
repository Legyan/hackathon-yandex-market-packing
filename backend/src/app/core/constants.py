from app.core.config import settings


NONPACK_CARTONTYPES = (
    'NONPACK',
    'STRETCH',
)
NONPACK_CARGOTYPES = (
    '340',
    '360'
)
NONPACK_TYPES = dict(zip(NONPACK_CARGOTYPES, NONPACK_CARTONTYPES))
PACKET_CARTONTYPES = (
    'MYA',
    'MYB',
    'MYC',
    'MYD',
    'MYE',
)
FRAGILITY_CARGOTYPES = (
    310,
)
DS_URL = 'http://' + settings.ds_host + ':8001/pack'
