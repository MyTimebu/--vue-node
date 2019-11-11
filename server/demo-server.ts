// demo-server.ts
export class Demodata {
  constructor(
      public id: number,
      public name: string,
      public desc: string) { }
}

const datas: Array<Demodata> = [
  new Demodata(1, 'heimayu', 'this is my bolg name'),
  new Demodata(2, 'websocket', 'this chapter is introduce websocket'),
  new Demodata(3, 'express', 'you can use express to start webapp')
]
