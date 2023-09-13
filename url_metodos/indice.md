routes.use("/bike", bike);
routes.use("/categoria", category);
routes.use("/foto", photo);
routes.use("/locacao", rent);
routes.use("/marca", brand);
routes.use("/usuario", user);

Método GET:
http://localhost:3001/bike

[
  {
    "id": 2,
    "color": "preta",
    "size": "17",
    "material": "aluminio",
    "gender": "unissex",
    "speedkit": "2x10",
    "rim": 29,
    "suspension": true,
    "description": "Bicicleta nova",
    "hourlyvalue": "10.00",
    "dailyvalue": "30.00",
    "latitude": 1.1,
    "longitude": 2.2,
    "user": {
      "id": 1,
      "alias": "aaa",
      "mail": "a@teste.com",
      "phone": "12988775540"
    },
    "brand": {
      "id": 1,
      "name": "Oggi"
    },
    "category": {
      "id": 1,
      "name": "Speedy"
    },
    "photos": []
  },
  {
    "id": 1,
    "color": "preta",
    "size": "17",
    "material": "aluminio",
    "gender": "unissex",
    "speedkit": "2x10",
    "rim": 29,
    "suspension": true,
    "description": "Bicicleta nova",
    "hourlyvalue": "10.00",
    "dailyvalue": "30.00",
    "latitude": 1.1,
    "longitude": 2.2,
    "user": {
      "id": 1,
      "alias": "aaa",
      "mail": "a@teste.com",
      "phone": "12988775540"
    },
    "brand": {
      "id": 1,
      "name": "Oggi"
    },
    "category": {
      "id": 1,
      "name": "Speedy"
    },
    "photos": []
  },
  {
    "id": 3,
    "color": "preta",
    "size": "17",
    "material": "aluminio",
    "gender": "unissex",
    "speedkit": "2x10",
    "rim": 29,
    "suspension": true,
    "description": "Bicicleta nova",
    "hourlyvalue": "10.00",
    "dailyvalue": "30.00",
    "latitude": 1.1,
    "longitude": 2.2,
    "user": {
      "id": 1,
      "alias": "aaa",
      "mail": "a@teste.com",
      "phone": "12988775540"
    },
    "brand": {
      "id": 1,
      "name": "Oggi"
    },
    "category": {
      "id": 1,
      "name": "Speedy"
    },
    "photos": []
  }
]

http://localhost:3001/categoria

[
  {
    "id": 2,
    "name": "Gravel"
  },
  {
    "id": 3,
    "name": "MTB"
  },
  {
    "id": 1,
    "name": "Speedy"
  }
]

http://localhost:3001/foto

[]

http://localhost:3001/locacao

[]

http://localhost:3001/marca

[
  {
    "id": 7,
    "name": "abcd"
  },
  {
    "id": 11,
    "name": "Barra forte"
  },
  {
    "id": 3,
    "name": "Caloi"
  },
  {
    "id": 8,
    "name": "Monark"
  },
  {
    "id": 1,
    "name": "Oggi"
  },
  {
    "id": 6,
    "name": "tcn"
  },
  {

http://localhost:3001/usuario

[
  {
    "id": 1,
    "alias": "aaa",
    "mail": "a@teste.com",
    "phone": "12988775540"
  },
  {
    "id": 2,
    "alias": "bbb",
    "mail": "b@teste.com",
    "phone": "12988775550"
  },
  {
    "id": 3,
    "alias": "ccc",
    "mail": "c@teste.com",
    "phone": "12988775560"
  }
]
