import { IInterceptor } from "../types/intercept-utils";
import { IObservableArray, IArrayWillChange, IArrayWillSplice } from "../types/observablearray";
import { ObservableMap, IMapWillChange } from "../types/observablemap";
import { IObjectWillChange } from "../types/observableobject";
import { IValueWillChange, IObservableValue } from "../types/observablevalue";
import { Lambda } from "../utils/utils";
export declare function intercept<T>(value: IObservableValue<T>, handler: IInterceptor<IValueWillChange<T>>): Lambda;
export declare function intercept<T>(observableArray: IObservableArray<T>, handler: IInterceptor<IArrayWillChange<T> | IArrayWillSplice<T>>): Lambda;
export declare function intercept<T>(observableMap: ObservableMap<T>, handler: IInterceptor<IMapWillChange<T>>): Lambda;
export declare function intercept<T>(observableMap: ObservableMap<T>, property: string, handler: IInterceptor<IValueWillChange<T>>): Lambda;
export declare function intercept(object: Object, handler: IInterceptor<IObjectWillChange>): Lambda;
export declare function intercept(object: Object, property: string, handler: IInterceptor<IValueWillChange<any>>): Lambda;
