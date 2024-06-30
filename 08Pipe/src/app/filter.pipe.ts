import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(value: string[] | number[], direction: 'asc' | 'desc' = 'asc') {
    // создаем метод transform  с двумя параметрами: value и direction
    let sortedArr = [...value]; // создаем копию массива value

    return sortedArr.sort((a: string | number, b: string | number) => {
      // сортируем массив
      if (direction === 'asc') return a > b ? 1 : -1; // если direction равен 'asc', сортируем по возрастанию a > b ? 1 : -1 (тернарный оператор) - если a > b, возвращаем 1, иначе -1
      return b < a ? -1 : 1; // иначе сортируем по убыванию
    });
  }
}
