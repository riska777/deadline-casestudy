import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  public getValue(key: string): string | null {
    return localStorage.getItem(key);
  }

  public getListValue<T>(key: string): T[] {
    const list = localStorage.getItem(key);
    return list ? JSON.parse(list) : [];
  }

  public setValue(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public setListValue<T>(key: string, value: T[]): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public addToList<T>(key: string, item: T): void {
    const list = this.getListValue<T>(key);
    list.push(item);
    this.setListValue<T>(key, list);
    window.dispatchEvent(new Event('dataUpdated'));
  }

  /* TODO: implement removeFromList */

  public removeValue(key: string): void {
    localStorage.removeItem(key);
  }

  public clear(): void {
    localStorage.clear();
  }
}
