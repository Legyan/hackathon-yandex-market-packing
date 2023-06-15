export const data = {
  orderkey: "441241ada",
  goodscell: 'B-09',
  goods: [
    {
      sku: "321dsa",
      title: "Тарелка",
      description: "Тарелка 20 см",
      image: "https://images.satu.kz/180057753_tarelka-9-diametr.jpg",
      imei: false,
      honest_sign: false,
      fragility: true
    },
    {
      sku: "322dsa",
      title: "Яндекс Станция",
      description: "Колонка с Алисой",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYs6EQdrFWklrCqCcXQr8mN1vQ4ePN5N8hAA&usqp=CAU",
      imei: false,
      honest_sign: false,
      fragility: false
    },
  ],
  recomend_packing: [
      {
        cartontype: "carton3",
        items: [
          {
            sku: "322dsa",
            count: 2
          },
          {
            sku: "321dsa",
            count: 1
          }
        ]
      },
      {
        cartontype: "packet2",
        items: [
          {
            sku: "322dsa",
            count: 2
          },
          {
            sku: "321dsa",
            count: 1
          },
        ]
      },
  ]
}