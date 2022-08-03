


export abstract class EntityTransformer<T> {
    abstract toEntity() : T;
}
export abstract class DtoTransformer<T>{
    abstract toDto() : T;
}

export abstract class DtoTransformerFunction<T extends Function,R>{
    abstract toDto(d : T) : R;
}
