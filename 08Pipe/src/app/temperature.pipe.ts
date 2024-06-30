import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temp', // это имя будет использоваться в шаблоне
  standalone: true, // это означает, что этот компонент не имеет зависимостей
})
export class TemperaturePipe implements PipeTransform {
  // реализуем интерфейс PipeTransform
  transform(
    value: string | number | null, // значение, которое нужно преобразовать
    inputType: 'cel' | 'far', // тип входных данных
    outputType?: 'cel' | 'far' // тип выходных данных
  ): unknown {
    if (!value) return value; // если значение не передано, возвращаем его как есть

    let val: number;
    if (typeof value === 'string')
      val = parseFloat(value); // преобразуем строку в число
    else val = value;
    let outputTemp: number | string;

    if (inputType === 'cel' && outputType === 'far') {
      // если входные данные - цельсии, а выходные - фаренгейты
      outputTemp = (val * 9) / 5 + 32; // преобразуем
    } else if (inputType === 'far' && outputType === 'cel') {
      // если входные данные - фаренгейты, а выходные - цельсии
      outputTemp = ((val - 32) * 5) / 9; // преобразуем
    } else outputTemp = val; // если типы одинаковые, возвращаем значение как есть

    let symbol: '°C' | '°F'; // символ градусов

    if (!outputType)
      symbol =
        inputType === 'cel'
          ? '°C'
          : '°F'; // если тип выходных данных не передан, берем его из входных данных
    else symbol = outputType === 'cel' ? '°C' : '°F'; // иначе берем его из выходных данных

    return `${outputTemp!.toFixed(1)} ${symbol}`; // возвращаем значение с округлением до одного знака после запятой и символом градусов
  }
}
