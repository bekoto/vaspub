export declare abstract class EntityTransformer<T> {
    abstract toEntity(): T;
}
export declare abstract class DtoTransformer<T> {
    abstract toDto(): T;
}
export declare abstract class DtoTransformerFunction<T extends Function, R> {
    abstract toDto(d: T): R;
}
