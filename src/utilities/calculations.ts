export class Calculations {

  calcReduce(data: any, attr: string) {
    return Number(data.reduce((acc: number, d: any) => Number((acc + d[attr]).toFixed(2)), 0).toFixed(2))
  }
}