
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Agent
 * 
 */
export type Agent = $Result.DefaultSelection<Prisma.$AgentPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model Invoice
 * 
 */
export type Invoice = $Result.DefaultSelection<Prisma.$InvoicePayload>
/**
 * Model InvoiceItem
 * 
 */
export type InvoiceItem = $Result.DefaultSelection<Prisma.$InvoiceItemPayload>
/**
 * Model RawInvoiceItem
 * 
 */
export type RawInvoiceItem = $Result.DefaultSelection<Prisma.$RawInvoiceItemPayload>
/**
 * Model ProductPriceMemory
 * 
 */
export type ProductPriceMemory = $Result.DefaultSelection<Prisma.$ProductPriceMemoryPayload>
/**
 * Model InvoicePhoto
 * 
 */
export type InvoicePhoto = $Result.DefaultSelection<Prisma.$InvoicePhotoPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const InvoiceType: {
  INCOME: 'INCOME',
  EXPENSE: 'EXPENSE'
};

export type InvoiceType = (typeof InvoiceType)[keyof typeof InvoiceType]


export const PriceSource: {
  AUTO: 'AUTO',
  MANUAL: 'MANUAL'
};

export type PriceSource = (typeof PriceSource)[keyof typeof PriceSource]


export const UnitType: {
  PIECE: 'PIECE',
  BOX: 'BOX'
};

export type UnitType = (typeof UnitType)[keyof typeof UnitType]


export const AgentInvoiceFormat: {
  STANDARD: 'STANDARD',
  BOX_IN_QTY: 'BOX_IN_QTY',
  CUSTOM_4: 'CUSTOM_4'
};

export type AgentInvoiceFormat = (typeof AgentInvoiceFormat)[keyof typeof AgentInvoiceFormat]

}

export type InvoiceType = $Enums.InvoiceType

export const InvoiceType: typeof $Enums.InvoiceType

export type PriceSource = $Enums.PriceSource

export const PriceSource: typeof $Enums.PriceSource

export type UnitType = $Enums.UnitType

export const UnitType: typeof $Enums.UnitType

export type AgentInvoiceFormat = $Enums.AgentInvoiceFormat

export const AgentInvoiceFormat: typeof $Enums.AgentInvoiceFormat

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Agents
 * const agents = await prisma.agent.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Agents
   * const agents = await prisma.agent.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.agent`: Exposes CRUD operations for the **Agent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Agents
    * const agents = await prisma.agent.findMany()
    * ```
    */
  get agent(): Prisma.AgentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.invoice`: Exposes CRUD operations for the **Invoice** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Invoices
    * const invoices = await prisma.invoice.findMany()
    * ```
    */
  get invoice(): Prisma.InvoiceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.invoiceItem`: Exposes CRUD operations for the **InvoiceItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InvoiceItems
    * const invoiceItems = await prisma.invoiceItem.findMany()
    * ```
    */
  get invoiceItem(): Prisma.InvoiceItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rawInvoiceItem`: Exposes CRUD operations for the **RawInvoiceItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RawInvoiceItems
    * const rawInvoiceItems = await prisma.rawInvoiceItem.findMany()
    * ```
    */
  get rawInvoiceItem(): Prisma.RawInvoiceItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productPriceMemory`: Exposes CRUD operations for the **ProductPriceMemory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductPriceMemories
    * const productPriceMemories = await prisma.productPriceMemory.findMany()
    * ```
    */
  get productPriceMemory(): Prisma.ProductPriceMemoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.invoicePhoto`: Exposes CRUD operations for the **InvoicePhoto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InvoicePhotos
    * const invoicePhotos = await prisma.invoicePhoto.findMany()
    * ```
    */
  get invoicePhoto(): Prisma.InvoicePhotoDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.3.0
   * Query Engine version: 9d6ad21cbbceab97458517b147a6a09ff43aa735
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Agent: 'Agent',
    Product: 'Product',
    Invoice: 'Invoice',
    InvoiceItem: 'InvoiceItem',
    RawInvoiceItem: 'RawInvoiceItem',
    ProductPriceMemory: 'ProductPriceMemory',
    InvoicePhoto: 'InvoicePhoto'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "agent" | "product" | "invoice" | "invoiceItem" | "rawInvoiceItem" | "productPriceMemory" | "invoicePhoto"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Agent: {
        payload: Prisma.$AgentPayload<ExtArgs>
        fields: Prisma.AgentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          findFirst: {
            args: Prisma.AgentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          findMany: {
            args: Prisma.AgentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>[]
          }
          create: {
            args: Prisma.AgentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          createMany: {
            args: Prisma.AgentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AgentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>[]
          }
          delete: {
            args: Prisma.AgentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          update: {
            args: Prisma.AgentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          deleteMany: {
            args: Prisma.AgentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AgentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>[]
          }
          upsert: {
            args: Prisma.AgentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          aggregate: {
            args: Prisma.AgentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgent>
          }
          groupBy: {
            args: Prisma.AgentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgentCountArgs<ExtArgs>
            result: $Utils.Optional<AgentCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      Invoice: {
        payload: Prisma.$InvoicePayload<ExtArgs>
        fields: Prisma.InvoiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvoiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvoiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          findFirst: {
            args: Prisma.InvoiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvoiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          findMany: {
            args: Prisma.InvoiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>[]
          }
          create: {
            args: Prisma.InvoiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          createMany: {
            args: Prisma.InvoiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InvoiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>[]
          }
          delete: {
            args: Prisma.InvoiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          update: {
            args: Prisma.InvoiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          deleteMany: {
            args: Prisma.InvoiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvoiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InvoiceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>[]
          }
          upsert: {
            args: Prisma.InvoiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePayload>
          }
          aggregate: {
            args: Prisma.InvoiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvoice>
          }
          groupBy: {
            args: Prisma.InvoiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvoiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvoiceCountArgs<ExtArgs>
            result: $Utils.Optional<InvoiceCountAggregateOutputType> | number
          }
        }
      }
      InvoiceItem: {
        payload: Prisma.$InvoiceItemPayload<ExtArgs>
        fields: Prisma.InvoiceItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvoiceItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvoiceItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceItemPayload>
          }
          findFirst: {
            args: Prisma.InvoiceItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvoiceItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceItemPayload>
          }
          findMany: {
            args: Prisma.InvoiceItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceItemPayload>[]
          }
          create: {
            args: Prisma.InvoiceItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceItemPayload>
          }
          createMany: {
            args: Prisma.InvoiceItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InvoiceItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceItemPayload>[]
          }
          delete: {
            args: Prisma.InvoiceItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceItemPayload>
          }
          update: {
            args: Prisma.InvoiceItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceItemPayload>
          }
          deleteMany: {
            args: Prisma.InvoiceItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvoiceItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InvoiceItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceItemPayload>[]
          }
          upsert: {
            args: Prisma.InvoiceItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoiceItemPayload>
          }
          aggregate: {
            args: Prisma.InvoiceItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvoiceItem>
          }
          groupBy: {
            args: Prisma.InvoiceItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvoiceItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvoiceItemCountArgs<ExtArgs>
            result: $Utils.Optional<InvoiceItemCountAggregateOutputType> | number
          }
        }
      }
      RawInvoiceItem: {
        payload: Prisma.$RawInvoiceItemPayload<ExtArgs>
        fields: Prisma.RawInvoiceItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RawInvoiceItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RawInvoiceItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RawInvoiceItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RawInvoiceItemPayload>
          }
          findFirst: {
            args: Prisma.RawInvoiceItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RawInvoiceItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RawInvoiceItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RawInvoiceItemPayload>
          }
          findMany: {
            args: Prisma.RawInvoiceItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RawInvoiceItemPayload>[]
          }
          create: {
            args: Prisma.RawInvoiceItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RawInvoiceItemPayload>
          }
          createMany: {
            args: Prisma.RawInvoiceItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RawInvoiceItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RawInvoiceItemPayload>[]
          }
          delete: {
            args: Prisma.RawInvoiceItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RawInvoiceItemPayload>
          }
          update: {
            args: Prisma.RawInvoiceItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RawInvoiceItemPayload>
          }
          deleteMany: {
            args: Prisma.RawInvoiceItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RawInvoiceItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RawInvoiceItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RawInvoiceItemPayload>[]
          }
          upsert: {
            args: Prisma.RawInvoiceItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RawInvoiceItemPayload>
          }
          aggregate: {
            args: Prisma.RawInvoiceItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRawInvoiceItem>
          }
          groupBy: {
            args: Prisma.RawInvoiceItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<RawInvoiceItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.RawInvoiceItemCountArgs<ExtArgs>
            result: $Utils.Optional<RawInvoiceItemCountAggregateOutputType> | number
          }
        }
      }
      ProductPriceMemory: {
        payload: Prisma.$ProductPriceMemoryPayload<ExtArgs>
        fields: Prisma.ProductPriceMemoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductPriceMemoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPriceMemoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductPriceMemoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPriceMemoryPayload>
          }
          findFirst: {
            args: Prisma.ProductPriceMemoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPriceMemoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductPriceMemoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPriceMemoryPayload>
          }
          findMany: {
            args: Prisma.ProductPriceMemoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPriceMemoryPayload>[]
          }
          create: {
            args: Prisma.ProductPriceMemoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPriceMemoryPayload>
          }
          createMany: {
            args: Prisma.ProductPriceMemoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductPriceMemoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPriceMemoryPayload>[]
          }
          delete: {
            args: Prisma.ProductPriceMemoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPriceMemoryPayload>
          }
          update: {
            args: Prisma.ProductPriceMemoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPriceMemoryPayload>
          }
          deleteMany: {
            args: Prisma.ProductPriceMemoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductPriceMemoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductPriceMemoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPriceMemoryPayload>[]
          }
          upsert: {
            args: Prisma.ProductPriceMemoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPriceMemoryPayload>
          }
          aggregate: {
            args: Prisma.ProductPriceMemoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductPriceMemory>
          }
          groupBy: {
            args: Prisma.ProductPriceMemoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductPriceMemoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductPriceMemoryCountArgs<ExtArgs>
            result: $Utils.Optional<ProductPriceMemoryCountAggregateOutputType> | number
          }
        }
      }
      InvoicePhoto: {
        payload: Prisma.$InvoicePhotoPayload<ExtArgs>
        fields: Prisma.InvoicePhotoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InvoicePhotoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePhotoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InvoicePhotoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePhotoPayload>
          }
          findFirst: {
            args: Prisma.InvoicePhotoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePhotoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InvoicePhotoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePhotoPayload>
          }
          findMany: {
            args: Prisma.InvoicePhotoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePhotoPayload>[]
          }
          create: {
            args: Prisma.InvoicePhotoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePhotoPayload>
          }
          createMany: {
            args: Prisma.InvoicePhotoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InvoicePhotoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePhotoPayload>[]
          }
          delete: {
            args: Prisma.InvoicePhotoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePhotoPayload>
          }
          update: {
            args: Prisma.InvoicePhotoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePhotoPayload>
          }
          deleteMany: {
            args: Prisma.InvoicePhotoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InvoicePhotoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InvoicePhotoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePhotoPayload>[]
          }
          upsert: {
            args: Prisma.InvoicePhotoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InvoicePhotoPayload>
          }
          aggregate: {
            args: Prisma.InvoicePhotoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInvoicePhoto>
          }
          groupBy: {
            args: Prisma.InvoicePhotoGroupByArgs<ExtArgs>
            result: $Utils.Optional<InvoicePhotoGroupByOutputType>[]
          }
          count: {
            args: Prisma.InvoicePhotoCountArgs<ExtArgs>
            result: $Utils.Optional<InvoicePhotoCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    agent?: AgentOmit
    product?: ProductOmit
    invoice?: InvoiceOmit
    invoiceItem?: InvoiceItemOmit
    rawInvoiceItem?: RawInvoiceItemOmit
    productPriceMemory?: ProductPriceMemoryOmit
    invoicePhoto?: InvoicePhotoOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AgentCountOutputType
   */

  export type AgentCountOutputType = {
    invoices: number
    products: number
    priceMemory: number
  }

  export type AgentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invoices?: boolean | AgentCountOutputTypeCountInvoicesArgs
    products?: boolean | AgentCountOutputTypeCountProductsArgs
    priceMemory?: boolean | AgentCountOutputTypeCountPriceMemoryArgs
  }

  // Custom InputTypes
  /**
   * AgentCountOutputType without action
   */
  export type AgentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentCountOutputType
     */
    select?: AgentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AgentCountOutputType without action
   */
  export type AgentCountOutputTypeCountInvoicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceWhereInput
  }

  /**
   * AgentCountOutputType without action
   */
  export type AgentCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }

  /**
   * AgentCountOutputType without action
   */
  export type AgentCountOutputTypeCountPriceMemoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductPriceMemoryWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    invoiceItems: number
    priceMemory: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invoiceItems?: boolean | ProductCountOutputTypeCountInvoiceItemsArgs
    priceMemory?: boolean | ProductCountOutputTypeCountPriceMemoryArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountInvoiceItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceItemWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountPriceMemoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductPriceMemoryWhereInput
  }


  /**
   * Count Type InvoiceCountOutputType
   */

  export type InvoiceCountOutputType = {
    items: number
    photos: number
  }

  export type InvoiceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | InvoiceCountOutputTypeCountItemsArgs
    photos?: boolean | InvoiceCountOutputTypeCountPhotosArgs
  }

  // Custom InputTypes
  /**
   * InvoiceCountOutputType without action
   */
  export type InvoiceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceCountOutputType
     */
    select?: InvoiceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InvoiceCountOutputType without action
   */
  export type InvoiceCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceItemWhereInput
  }

  /**
   * InvoiceCountOutputType without action
   */
  export type InvoiceCountOutputTypeCountPhotosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoicePhotoWhereInput
  }


  /**
   * Count Type InvoicePhotoCountOutputType
   */

  export type InvoicePhotoCountOutputType = {
    rawInvoiceItems: number
  }

  export type InvoicePhotoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rawInvoiceItems?: boolean | InvoicePhotoCountOutputTypeCountRawInvoiceItemsArgs
  }

  // Custom InputTypes
  /**
   * InvoicePhotoCountOutputType without action
   */
  export type InvoicePhotoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoicePhotoCountOutputType
     */
    select?: InvoicePhotoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InvoicePhotoCountOutputType without action
   */
  export type InvoicePhotoCountOutputTypeCountRawInvoiceItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RawInvoiceItemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Agent
   */

  export type AggregateAgent = {
    _count: AgentCountAggregateOutputType | null
    _avg: AgentAvgAggregateOutputType | null
    _sum: AgentSumAggregateOutputType | null
    _min: AgentMinAggregateOutputType | null
    _max: AgentMaxAggregateOutputType | null
  }

  export type AgentAvgAggregateOutputType = {
    id: number | null
    markupPercent: number | null
  }

  export type AgentSumAggregateOutputType = {
    id: number | null
    markupPercent: number | null
  }

  export type AgentMinAggregateOutputType = {
    id: number | null
    name: string | null
    markupPercent: number | null
    format: $Enums.AgentInvoiceFormat | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AgentMaxAggregateOutputType = {
    id: number | null
    name: string | null
    markupPercent: number | null
    format: $Enums.AgentInvoiceFormat | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AgentCountAggregateOutputType = {
    id: number
    name: number
    markupPercent: number
    format: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AgentAvgAggregateInputType = {
    id?: true
    markupPercent?: true
  }

  export type AgentSumAggregateInputType = {
    id?: true
    markupPercent?: true
  }

  export type AgentMinAggregateInputType = {
    id?: true
    name?: true
    markupPercent?: true
    format?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AgentMaxAggregateInputType = {
    id?: true
    name?: true
    markupPercent?: true
    format?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AgentCountAggregateInputType = {
    id?: true
    name?: true
    markupPercent?: true
    format?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AgentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Agent to aggregate.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Agents
    **/
    _count?: true | AgentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AgentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AgentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgentMaxAggregateInputType
  }

  export type GetAgentAggregateType<T extends AgentAggregateArgs> = {
        [P in keyof T & keyof AggregateAgent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgent[P]>
      : GetScalarType<T[P], AggregateAgent[P]>
  }




  export type AgentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentWhereInput
    orderBy?: AgentOrderByWithAggregationInput | AgentOrderByWithAggregationInput[]
    by: AgentScalarFieldEnum[] | AgentScalarFieldEnum
    having?: AgentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgentCountAggregateInputType | true
    _avg?: AgentAvgAggregateInputType
    _sum?: AgentSumAggregateInputType
    _min?: AgentMinAggregateInputType
    _max?: AgentMaxAggregateInputType
  }

  export type AgentGroupByOutputType = {
    id: number
    name: string
    markupPercent: number
    format: $Enums.AgentInvoiceFormat | null
    createdAt: Date
    updatedAt: Date
    _count: AgentCountAggregateOutputType | null
    _avg: AgentAvgAggregateOutputType | null
    _sum: AgentSumAggregateOutputType | null
    _min: AgentMinAggregateOutputType | null
    _max: AgentMaxAggregateOutputType | null
  }

  type GetAgentGroupByPayload<T extends AgentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgentGroupByOutputType[P]>
            : GetScalarType<T[P], AgentGroupByOutputType[P]>
        }
      >
    >


  export type AgentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    markupPercent?: boolean
    format?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    invoices?: boolean | Agent$invoicesArgs<ExtArgs>
    products?: boolean | Agent$productsArgs<ExtArgs>
    priceMemory?: boolean | Agent$priceMemoryArgs<ExtArgs>
    _count?: boolean | AgentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agent"]>

  export type AgentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    markupPercent?: boolean
    format?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["agent"]>

  export type AgentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    markupPercent?: boolean
    format?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["agent"]>

  export type AgentSelectScalar = {
    id?: boolean
    name?: boolean
    markupPercent?: boolean
    format?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AgentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "markupPercent" | "format" | "createdAt" | "updatedAt", ExtArgs["result"]["agent"]>
  export type AgentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invoices?: boolean | Agent$invoicesArgs<ExtArgs>
    products?: boolean | Agent$productsArgs<ExtArgs>
    priceMemory?: boolean | Agent$priceMemoryArgs<ExtArgs>
    _count?: boolean | AgentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AgentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AgentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AgentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Agent"
    objects: {
      invoices: Prisma.$InvoicePayload<ExtArgs>[]
      products: Prisma.$ProductPayload<ExtArgs>[]
      priceMemory: Prisma.$ProductPriceMemoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      markupPercent: number
      format: $Enums.AgentInvoiceFormat | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["agent"]>
    composites: {}
  }

  type AgentGetPayload<S extends boolean | null | undefined | AgentDefaultArgs> = $Result.GetResult<Prisma.$AgentPayload, S>

  type AgentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AgentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AgentCountAggregateInputType | true
    }

  export interface AgentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Agent'], meta: { name: 'Agent' } }
    /**
     * Find zero or one Agent that matches the filter.
     * @param {AgentFindUniqueArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgentFindUniqueArgs>(args: SelectSubset<T, AgentFindUniqueArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Agent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AgentFindUniqueOrThrowArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgentFindUniqueOrThrowArgs>(args: SelectSubset<T, AgentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentFindFirstArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgentFindFirstArgs>(args?: SelectSubset<T, AgentFindFirstArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentFindFirstOrThrowArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgentFindFirstOrThrowArgs>(args?: SelectSubset<T, AgentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Agents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Agents
     * const agents = await prisma.agent.findMany()
     * 
     * // Get first 10 Agents
     * const agents = await prisma.agent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agentWithIdOnly = await prisma.agent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AgentFindManyArgs>(args?: SelectSubset<T, AgentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Agent.
     * @param {AgentCreateArgs} args - Arguments to create a Agent.
     * @example
     * // Create one Agent
     * const Agent = await prisma.agent.create({
     *   data: {
     *     // ... data to create a Agent
     *   }
     * })
     * 
     */
    create<T extends AgentCreateArgs>(args: SelectSubset<T, AgentCreateArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Agents.
     * @param {AgentCreateManyArgs} args - Arguments to create many Agents.
     * @example
     * // Create many Agents
     * const agent = await prisma.agent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgentCreateManyArgs>(args?: SelectSubset<T, AgentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Agents and returns the data saved in the database.
     * @param {AgentCreateManyAndReturnArgs} args - Arguments to create many Agents.
     * @example
     * // Create many Agents
     * const agent = await prisma.agent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Agents and only return the `id`
     * const agentWithIdOnly = await prisma.agent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AgentCreateManyAndReturnArgs>(args?: SelectSubset<T, AgentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Agent.
     * @param {AgentDeleteArgs} args - Arguments to delete one Agent.
     * @example
     * // Delete one Agent
     * const Agent = await prisma.agent.delete({
     *   where: {
     *     // ... filter to delete one Agent
     *   }
     * })
     * 
     */
    delete<T extends AgentDeleteArgs>(args: SelectSubset<T, AgentDeleteArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Agent.
     * @param {AgentUpdateArgs} args - Arguments to update one Agent.
     * @example
     * // Update one Agent
     * const agent = await prisma.agent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgentUpdateArgs>(args: SelectSubset<T, AgentUpdateArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Agents.
     * @param {AgentDeleteManyArgs} args - Arguments to filter Agents to delete.
     * @example
     * // Delete a few Agents
     * const { count } = await prisma.agent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgentDeleteManyArgs>(args?: SelectSubset<T, AgentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Agents
     * const agent = await prisma.agent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgentUpdateManyArgs>(args: SelectSubset<T, AgentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agents and returns the data updated in the database.
     * @param {AgentUpdateManyAndReturnArgs} args - Arguments to update many Agents.
     * @example
     * // Update many Agents
     * const agent = await prisma.agent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Agents and only return the `id`
     * const agentWithIdOnly = await prisma.agent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AgentUpdateManyAndReturnArgs>(args: SelectSubset<T, AgentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Agent.
     * @param {AgentUpsertArgs} args - Arguments to update or create a Agent.
     * @example
     * // Update or create a Agent
     * const agent = await prisma.agent.upsert({
     *   create: {
     *     // ... data to create a Agent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Agent we want to update
     *   }
     * })
     */
    upsert<T extends AgentUpsertArgs>(args: SelectSubset<T, AgentUpsertArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Agents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentCountArgs} args - Arguments to filter Agents to count.
     * @example
     * // Count the number of Agents
     * const count = await prisma.agent.count({
     *   where: {
     *     // ... the filter for the Agents we want to count
     *   }
     * })
    **/
    count<T extends AgentCountArgs>(
      args?: Subset<T, AgentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Agent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgentAggregateArgs>(args: Subset<T, AgentAggregateArgs>): Prisma.PrismaPromise<GetAgentAggregateType<T>>

    /**
     * Group by Agent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AgentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgentGroupByArgs['orderBy'] }
        : { orderBy?: AgentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AgentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Agent model
   */
  readonly fields: AgentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Agent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    invoices<T extends Agent$invoicesArgs<ExtArgs> = {}>(args?: Subset<T, Agent$invoicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    products<T extends Agent$productsArgs<ExtArgs> = {}>(args?: Subset<T, Agent$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    priceMemory<T extends Agent$priceMemoryArgs<ExtArgs> = {}>(args?: Subset<T, Agent$priceMemoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPriceMemoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Agent model
   */
  interface AgentFieldRefs {
    readonly id: FieldRef<"Agent", 'Int'>
    readonly name: FieldRef<"Agent", 'String'>
    readonly markupPercent: FieldRef<"Agent", 'Int'>
    readonly format: FieldRef<"Agent", 'AgentInvoiceFormat'>
    readonly createdAt: FieldRef<"Agent", 'DateTime'>
    readonly updatedAt: FieldRef<"Agent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Agent findUnique
   */
  export type AgentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent findUniqueOrThrow
   */
  export type AgentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent findFirst
   */
  export type AgentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Agents.
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Agents.
     */
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * Agent findFirstOrThrow
   */
  export type AgentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Agents.
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Agents.
     */
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * Agent findMany
   */
  export type AgentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agents to fetch.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Agents.
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * Agent create
   */
  export type AgentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * The data needed to create a Agent.
     */
    data: XOR<AgentCreateInput, AgentUncheckedCreateInput>
  }

  /**
   * Agent createMany
   */
  export type AgentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Agents.
     */
    data: AgentCreateManyInput | AgentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Agent createManyAndReturn
   */
  export type AgentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * The data used to create many Agents.
     */
    data: AgentCreateManyInput | AgentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Agent update
   */
  export type AgentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * The data needed to update a Agent.
     */
    data: XOR<AgentUpdateInput, AgentUncheckedUpdateInput>
    /**
     * Choose, which Agent to update.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent updateMany
   */
  export type AgentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Agents.
     */
    data: XOR<AgentUpdateManyMutationInput, AgentUncheckedUpdateManyInput>
    /**
     * Filter which Agents to update
     */
    where?: AgentWhereInput
    /**
     * Limit how many Agents to update.
     */
    limit?: number
  }

  /**
   * Agent updateManyAndReturn
   */
  export type AgentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * The data used to update Agents.
     */
    data: XOR<AgentUpdateManyMutationInput, AgentUncheckedUpdateManyInput>
    /**
     * Filter which Agents to update
     */
    where?: AgentWhereInput
    /**
     * Limit how many Agents to update.
     */
    limit?: number
  }

  /**
   * Agent upsert
   */
  export type AgentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * The filter to search for the Agent to update in case it exists.
     */
    where: AgentWhereUniqueInput
    /**
     * In case the Agent found by the `where` argument doesn't exist, create a new Agent with this data.
     */
    create: XOR<AgentCreateInput, AgentUncheckedCreateInput>
    /**
     * In case the Agent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgentUpdateInput, AgentUncheckedUpdateInput>
  }

  /**
   * Agent delete
   */
  export type AgentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter which Agent to delete.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent deleteMany
   */
  export type AgentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Agents to delete
     */
    where?: AgentWhereInput
    /**
     * Limit how many Agents to delete.
     */
    limit?: number
  }

  /**
   * Agent.invoices
   */
  export type Agent$invoicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    where?: InvoiceWhereInput
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    cursor?: InvoiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Agent.products
   */
  export type Agent$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Agent.priceMemory
   */
  export type Agent$priceMemoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductPriceMemory
     */
    select?: ProductPriceMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductPriceMemory
     */
    omit?: ProductPriceMemoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductPriceMemoryInclude<ExtArgs> | null
    where?: ProductPriceMemoryWhereInput
    orderBy?: ProductPriceMemoryOrderByWithRelationInput | ProductPriceMemoryOrderByWithRelationInput[]
    cursor?: ProductPriceMemoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductPriceMemoryScalarFieldEnum | ProductPriceMemoryScalarFieldEnum[]
  }

  /**
   * Agent without action
   */
  export type AgentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    id: number | null
    agentId: number | null
  }

  export type ProductSumAggregateOutputType = {
    id: number | null
    agentId: number | null
  }

  export type ProductMinAggregateOutputType = {
    id: number | null
    name: string | null
    category: string | null
    agentId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductMaxAggregateOutputType = {
    id: number | null
    name: string | null
    category: string | null
    agentId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    name: number
    category: number
    agentId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    id?: true
    agentId?: true
  }

  export type ProductSumAggregateInputType = {
    id?: true
    agentId?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    name?: true
    category?: true
    agentId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    name?: true
    category?: true
    agentId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    name?: true
    category?: true
    agentId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: number
    name: string
    category: string | null
    agentId: number | null
    createdAt: Date
    updatedAt: Date
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category?: boolean
    agentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    agent?: boolean | Product$agentArgs<ExtArgs>
    invoiceItems?: boolean | Product$invoiceItemsArgs<ExtArgs>
    priceMemory?: boolean | Product$priceMemoryArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category?: boolean
    agentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    agent?: boolean | Product$agentArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category?: boolean
    agentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    agent?: boolean | Product$agentArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    name?: boolean
    category?: boolean
    agentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "category" | "agentId" | "createdAt" | "updatedAt", ExtArgs["result"]["product"]>
  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | Product$agentArgs<ExtArgs>
    invoiceItems?: boolean | Product$invoiceItemsArgs<ExtArgs>
    priceMemory?: boolean | Product$priceMemoryArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | Product$agentArgs<ExtArgs>
  }
  export type ProductIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | Product$agentArgs<ExtArgs>
  }

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      agent: Prisma.$AgentPayload<ExtArgs> | null
      invoiceItems: Prisma.$InvoiceItemPayload<ExtArgs>[]
      priceMemory: Prisma.$ProductPriceMemoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      category: string | null
      agentId: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products and returns the data updated in the database.
     * @param {ProductUpdateManyAndReturnArgs} args - Arguments to update many Products.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Products and only return the `id`
     * const productWithIdOnly = await prisma.product.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agent<T extends Product$agentArgs<ExtArgs> = {}>(args?: Subset<T, Product$agentArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    invoiceItems<T extends Product$invoiceItemsArgs<ExtArgs> = {}>(args?: Subset<T, Product$invoiceItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoiceItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    priceMemory<T extends Product$priceMemoryArgs<ExtArgs> = {}>(args?: Subset<T, Product$priceMemoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPriceMemoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'Int'>
    readonly name: FieldRef<"Product", 'String'>
    readonly category: FieldRef<"Product", 'String'>
    readonly agentId: FieldRef<"Product", 'Int'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
    readonly updatedAt: FieldRef<"Product", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product updateManyAndReturn
   */
  export type ProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product.agent
   */
  export type Product$agentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    where?: AgentWhereInput
  }

  /**
   * Product.invoiceItems
   */
  export type Product$invoiceItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceItem
     */
    select?: InvoiceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceItem
     */
    omit?: InvoiceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceItemInclude<ExtArgs> | null
    where?: InvoiceItemWhereInput
    orderBy?: InvoiceItemOrderByWithRelationInput | InvoiceItemOrderByWithRelationInput[]
    cursor?: InvoiceItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvoiceItemScalarFieldEnum | InvoiceItemScalarFieldEnum[]
  }

  /**
   * Product.priceMemory
   */
  export type Product$priceMemoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductPriceMemory
     */
    select?: ProductPriceMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductPriceMemory
     */
    omit?: ProductPriceMemoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductPriceMemoryInclude<ExtArgs> | null
    where?: ProductPriceMemoryWhereInput
    orderBy?: ProductPriceMemoryOrderByWithRelationInput | ProductPriceMemoryOrderByWithRelationInput[]
    cursor?: ProductPriceMemoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductPriceMemoryScalarFieldEnum | ProductPriceMemoryScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model Invoice
   */

  export type AggregateInvoice = {
    _count: InvoiceCountAggregateOutputType | null
    _avg: InvoiceAvgAggregateOutputType | null
    _sum: InvoiceSumAggregateOutputType | null
    _min: InvoiceMinAggregateOutputType | null
    _max: InvoiceMaxAggregateOutputType | null
  }

  export type InvoiceAvgAggregateOutputType = {
    id: number | null
    agentId: number | null
    markupPercent: number | null
  }

  export type InvoiceSumAggregateOutputType = {
    id: number | null
    agentId: number | null
    markupPercent: number | null
  }

  export type InvoiceMinAggregateOutputType = {
    id: number | null
    agentId: number | null
    type: $Enums.InvoiceType | null
    invoiceDate: Date | null
    markupPercent: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InvoiceMaxAggregateOutputType = {
    id: number | null
    agentId: number | null
    type: $Enums.InvoiceType | null
    invoiceDate: Date | null
    markupPercent: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InvoiceCountAggregateOutputType = {
    id: number
    agentId: number
    type: number
    invoiceDate: number
    markupPercent: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InvoiceAvgAggregateInputType = {
    id?: true
    agentId?: true
    markupPercent?: true
  }

  export type InvoiceSumAggregateInputType = {
    id?: true
    agentId?: true
    markupPercent?: true
  }

  export type InvoiceMinAggregateInputType = {
    id?: true
    agentId?: true
    type?: true
    invoiceDate?: true
    markupPercent?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InvoiceMaxAggregateInputType = {
    id?: true
    agentId?: true
    type?: true
    invoiceDate?: true
    markupPercent?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InvoiceCountAggregateInputType = {
    id?: true
    agentId?: true
    type?: true
    invoiceDate?: true
    markupPercent?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InvoiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invoice to aggregate.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Invoices
    **/
    _count?: true | InvoiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InvoiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InvoiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvoiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvoiceMaxAggregateInputType
  }

  export type GetInvoiceAggregateType<T extends InvoiceAggregateArgs> = {
        [P in keyof T & keyof AggregateInvoice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvoice[P]>
      : GetScalarType<T[P], AggregateInvoice[P]>
  }




  export type InvoiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceWhereInput
    orderBy?: InvoiceOrderByWithAggregationInput | InvoiceOrderByWithAggregationInput[]
    by: InvoiceScalarFieldEnum[] | InvoiceScalarFieldEnum
    having?: InvoiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvoiceCountAggregateInputType | true
    _avg?: InvoiceAvgAggregateInputType
    _sum?: InvoiceSumAggregateInputType
    _min?: InvoiceMinAggregateInputType
    _max?: InvoiceMaxAggregateInputType
  }

  export type InvoiceGroupByOutputType = {
    id: number
    agentId: number
    type: $Enums.InvoiceType
    invoiceDate: Date
    markupPercent: number
    createdAt: Date
    updatedAt: Date
    _count: InvoiceCountAggregateOutputType | null
    _avg: InvoiceAvgAggregateOutputType | null
    _sum: InvoiceSumAggregateOutputType | null
    _min: InvoiceMinAggregateOutputType | null
    _max: InvoiceMaxAggregateOutputType | null
  }

  type GetInvoiceGroupByPayload<T extends InvoiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvoiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvoiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvoiceGroupByOutputType[P]>
            : GetScalarType<T[P], InvoiceGroupByOutputType[P]>
        }
      >
    >


  export type InvoiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    type?: boolean
    invoiceDate?: boolean
    markupPercent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    items?: boolean | Invoice$itemsArgs<ExtArgs>
    photos?: boolean | Invoice$photosArgs<ExtArgs>
    _count?: boolean | InvoiceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoice"]>

  export type InvoiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    type?: boolean
    invoiceDate?: boolean
    markupPercent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoice"]>

  export type InvoiceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    type?: boolean
    invoiceDate?: boolean
    markupPercent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoice"]>

  export type InvoiceSelectScalar = {
    id?: boolean
    agentId?: boolean
    type?: boolean
    invoiceDate?: boolean
    markupPercent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InvoiceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "agentId" | "type" | "invoiceDate" | "markupPercent" | "createdAt" | "updatedAt", ExtArgs["result"]["invoice"]>
  export type InvoiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    items?: boolean | Invoice$itemsArgs<ExtArgs>
    photos?: boolean | Invoice$photosArgs<ExtArgs>
    _count?: boolean | InvoiceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type InvoiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }
  export type InvoiceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }

  export type $InvoicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Invoice"
    objects: {
      agent: Prisma.$AgentPayload<ExtArgs>
      items: Prisma.$InvoiceItemPayload<ExtArgs>[]
      photos: Prisma.$InvoicePhotoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      agentId: number
      type: $Enums.InvoiceType
      invoiceDate: Date
      markupPercent: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["invoice"]>
    composites: {}
  }

  type InvoiceGetPayload<S extends boolean | null | undefined | InvoiceDefaultArgs> = $Result.GetResult<Prisma.$InvoicePayload, S>

  type InvoiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InvoiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InvoiceCountAggregateInputType | true
    }

  export interface InvoiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Invoice'], meta: { name: 'Invoice' } }
    /**
     * Find zero or one Invoice that matches the filter.
     * @param {InvoiceFindUniqueArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvoiceFindUniqueArgs>(args: SelectSubset<T, InvoiceFindUniqueArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Invoice that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InvoiceFindUniqueOrThrowArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvoiceFindUniqueOrThrowArgs>(args: SelectSubset<T, InvoiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Invoice that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFindFirstArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvoiceFindFirstArgs>(args?: SelectSubset<T, InvoiceFindFirstArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Invoice that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFindFirstOrThrowArgs} args - Arguments to find a Invoice
     * @example
     * // Get one Invoice
     * const invoice = await prisma.invoice.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvoiceFindFirstOrThrowArgs>(args?: SelectSubset<T, InvoiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Invoices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Invoices
     * const invoices = await prisma.invoice.findMany()
     * 
     * // Get first 10 Invoices
     * const invoices = await prisma.invoice.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const invoiceWithIdOnly = await prisma.invoice.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InvoiceFindManyArgs>(args?: SelectSubset<T, InvoiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Invoice.
     * @param {InvoiceCreateArgs} args - Arguments to create a Invoice.
     * @example
     * // Create one Invoice
     * const Invoice = await prisma.invoice.create({
     *   data: {
     *     // ... data to create a Invoice
     *   }
     * })
     * 
     */
    create<T extends InvoiceCreateArgs>(args: SelectSubset<T, InvoiceCreateArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Invoices.
     * @param {InvoiceCreateManyArgs} args - Arguments to create many Invoices.
     * @example
     * // Create many Invoices
     * const invoice = await prisma.invoice.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvoiceCreateManyArgs>(args?: SelectSubset<T, InvoiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Invoices and returns the data saved in the database.
     * @param {InvoiceCreateManyAndReturnArgs} args - Arguments to create many Invoices.
     * @example
     * // Create many Invoices
     * const invoice = await prisma.invoice.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Invoices and only return the `id`
     * const invoiceWithIdOnly = await prisma.invoice.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InvoiceCreateManyAndReturnArgs>(args?: SelectSubset<T, InvoiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Invoice.
     * @param {InvoiceDeleteArgs} args - Arguments to delete one Invoice.
     * @example
     * // Delete one Invoice
     * const Invoice = await prisma.invoice.delete({
     *   where: {
     *     // ... filter to delete one Invoice
     *   }
     * })
     * 
     */
    delete<T extends InvoiceDeleteArgs>(args: SelectSubset<T, InvoiceDeleteArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Invoice.
     * @param {InvoiceUpdateArgs} args - Arguments to update one Invoice.
     * @example
     * // Update one Invoice
     * const invoice = await prisma.invoice.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvoiceUpdateArgs>(args: SelectSubset<T, InvoiceUpdateArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Invoices.
     * @param {InvoiceDeleteManyArgs} args - Arguments to filter Invoices to delete.
     * @example
     * // Delete a few Invoices
     * const { count } = await prisma.invoice.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvoiceDeleteManyArgs>(args?: SelectSubset<T, InvoiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invoices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Invoices
     * const invoice = await prisma.invoice.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvoiceUpdateManyArgs>(args: SelectSubset<T, InvoiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Invoices and returns the data updated in the database.
     * @param {InvoiceUpdateManyAndReturnArgs} args - Arguments to update many Invoices.
     * @example
     * // Update many Invoices
     * const invoice = await prisma.invoice.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Invoices and only return the `id`
     * const invoiceWithIdOnly = await prisma.invoice.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InvoiceUpdateManyAndReturnArgs>(args: SelectSubset<T, InvoiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Invoice.
     * @param {InvoiceUpsertArgs} args - Arguments to update or create a Invoice.
     * @example
     * // Update or create a Invoice
     * const invoice = await prisma.invoice.upsert({
     *   create: {
     *     // ... data to create a Invoice
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Invoice we want to update
     *   }
     * })
     */
    upsert<T extends InvoiceUpsertArgs>(args: SelectSubset<T, InvoiceUpsertArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Invoices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceCountArgs} args - Arguments to filter Invoices to count.
     * @example
     * // Count the number of Invoices
     * const count = await prisma.invoice.count({
     *   where: {
     *     // ... the filter for the Invoices we want to count
     *   }
     * })
    **/
    count<T extends InvoiceCountArgs>(
      args?: Subset<T, InvoiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvoiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Invoice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvoiceAggregateArgs>(args: Subset<T, InvoiceAggregateArgs>): Prisma.PrismaPromise<GetInvoiceAggregateType<T>>

    /**
     * Group by Invoice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InvoiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvoiceGroupByArgs['orderBy'] }
        : { orderBy?: InvoiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InvoiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvoiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Invoice model
   */
  readonly fields: InvoiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Invoice.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvoiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agent<T extends AgentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AgentDefaultArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    items<T extends Invoice$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Invoice$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoiceItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    photos<T extends Invoice$photosArgs<ExtArgs> = {}>(args?: Subset<T, Invoice$photosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePhotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Invoice model
   */
  interface InvoiceFieldRefs {
    readonly id: FieldRef<"Invoice", 'Int'>
    readonly agentId: FieldRef<"Invoice", 'Int'>
    readonly type: FieldRef<"Invoice", 'InvoiceType'>
    readonly invoiceDate: FieldRef<"Invoice", 'DateTime'>
    readonly markupPercent: FieldRef<"Invoice", 'Int'>
    readonly createdAt: FieldRef<"Invoice", 'DateTime'>
    readonly updatedAt: FieldRef<"Invoice", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Invoice findUnique
   */
  export type InvoiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice findUniqueOrThrow
   */
  export type InvoiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice findFirst
   */
  export type InvoiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invoices.
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invoices.
     */
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Invoice findFirstOrThrow
   */
  export type InvoiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoice to fetch.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Invoices.
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Invoices.
     */
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Invoice findMany
   */
  export type InvoiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter, which Invoices to fetch.
     */
    where?: InvoiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Invoices to fetch.
     */
    orderBy?: InvoiceOrderByWithRelationInput | InvoiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Invoices.
     */
    cursor?: InvoiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Invoices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Invoices.
     */
    skip?: number
    distinct?: InvoiceScalarFieldEnum | InvoiceScalarFieldEnum[]
  }

  /**
   * Invoice create
   */
  export type InvoiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * The data needed to create a Invoice.
     */
    data: XOR<InvoiceCreateInput, InvoiceUncheckedCreateInput>
  }

  /**
   * Invoice createMany
   */
  export type InvoiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Invoices.
     */
    data: InvoiceCreateManyInput | InvoiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Invoice createManyAndReturn
   */
  export type InvoiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * The data used to create many Invoices.
     */
    data: InvoiceCreateManyInput | InvoiceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Invoice update
   */
  export type InvoiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * The data needed to update a Invoice.
     */
    data: XOR<InvoiceUpdateInput, InvoiceUncheckedUpdateInput>
    /**
     * Choose, which Invoice to update.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice updateMany
   */
  export type InvoiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Invoices.
     */
    data: XOR<InvoiceUpdateManyMutationInput, InvoiceUncheckedUpdateManyInput>
    /**
     * Filter which Invoices to update
     */
    where?: InvoiceWhereInput
    /**
     * Limit how many Invoices to update.
     */
    limit?: number
  }

  /**
   * Invoice updateManyAndReturn
   */
  export type InvoiceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * The data used to update Invoices.
     */
    data: XOR<InvoiceUpdateManyMutationInput, InvoiceUncheckedUpdateManyInput>
    /**
     * Filter which Invoices to update
     */
    where?: InvoiceWhereInput
    /**
     * Limit how many Invoices to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Invoice upsert
   */
  export type InvoiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * The filter to search for the Invoice to update in case it exists.
     */
    where: InvoiceWhereUniqueInput
    /**
     * In case the Invoice found by the `where` argument doesn't exist, create a new Invoice with this data.
     */
    create: XOR<InvoiceCreateInput, InvoiceUncheckedCreateInput>
    /**
     * In case the Invoice was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvoiceUpdateInput, InvoiceUncheckedUpdateInput>
  }

  /**
   * Invoice delete
   */
  export type InvoiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
    /**
     * Filter which Invoice to delete.
     */
    where: InvoiceWhereUniqueInput
  }

  /**
   * Invoice deleteMany
   */
  export type InvoiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Invoices to delete
     */
    where?: InvoiceWhereInput
    /**
     * Limit how many Invoices to delete.
     */
    limit?: number
  }

  /**
   * Invoice.items
   */
  export type Invoice$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceItem
     */
    select?: InvoiceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceItem
     */
    omit?: InvoiceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceItemInclude<ExtArgs> | null
    where?: InvoiceItemWhereInput
    orderBy?: InvoiceItemOrderByWithRelationInput | InvoiceItemOrderByWithRelationInput[]
    cursor?: InvoiceItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvoiceItemScalarFieldEnum | InvoiceItemScalarFieldEnum[]
  }

  /**
   * Invoice.photos
   */
  export type Invoice$photosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoicePhoto
     */
    select?: InvoicePhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoicePhoto
     */
    omit?: InvoicePhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoicePhotoInclude<ExtArgs> | null
    where?: InvoicePhotoWhereInput
    orderBy?: InvoicePhotoOrderByWithRelationInput | InvoicePhotoOrderByWithRelationInput[]
    cursor?: InvoicePhotoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InvoicePhotoScalarFieldEnum | InvoicePhotoScalarFieldEnum[]
  }

  /**
   * Invoice without action
   */
  export type InvoiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: InvoiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Invoice
     */
    omit?: InvoiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceInclude<ExtArgs> | null
  }


  /**
   * Model InvoiceItem
   */

  export type AggregateInvoiceItem = {
    _count: InvoiceItemCountAggregateOutputType | null
    _avg: InvoiceItemAvgAggregateOutputType | null
    _sum: InvoiceItemSumAggregateOutputType | null
    _min: InvoiceItemMinAggregateOutputType | null
    _max: InvoiceItemMaxAggregateOutputType | null
  }

  export type InvoiceItemAvgAggregateOutputType = {
    id: number | null
    invoiceId: number | null
    productId: number | null
    boxSize: number | null
    quantity: number | null
    boxesCount: number | null
    purchasePrice: number | null
    purchasePricePerUnit: number | null
    calculatedPrice: number | null
    roundedPrice: number | null
  }

  export type InvoiceItemSumAggregateOutputType = {
    id: number | null
    invoiceId: number | null
    productId: number | null
    boxSize: number | null
    quantity: number | null
    boxesCount: number | null
    purchasePrice: bigint | null
    purchasePricePerUnit: bigint | null
    calculatedPrice: bigint | null
    roundedPrice: bigint | null
  }

  export type InvoiceItemMinAggregateOutputType = {
    id: number | null
    invoiceId: number | null
    productId: number | null
    productName: string | null
    unitType: $Enums.UnitType | null
    boxSize: number | null
    quantity: number | null
    boxesCount: number | null
    purchasePrice: bigint | null
    purchasePricePerUnit: bigint | null
    calculatedPrice: bigint | null
    roundedPrice: bigint | null
    priceChanged: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InvoiceItemMaxAggregateOutputType = {
    id: number | null
    invoiceId: number | null
    productId: number | null
    productName: string | null
    unitType: $Enums.UnitType | null
    boxSize: number | null
    quantity: number | null
    boxesCount: number | null
    purchasePrice: bigint | null
    purchasePricePerUnit: bigint | null
    calculatedPrice: bigint | null
    roundedPrice: bigint | null
    priceChanged: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InvoiceItemCountAggregateOutputType = {
    id: number
    invoiceId: number
    productId: number
    productName: number
    unitType: number
    boxSize: number
    quantity: number
    boxesCount: number
    purchasePrice: number
    purchasePricePerUnit: number
    calculatedPrice: number
    roundedPrice: number
    priceChanged: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InvoiceItemAvgAggregateInputType = {
    id?: true
    invoiceId?: true
    productId?: true
    boxSize?: true
    quantity?: true
    boxesCount?: true
    purchasePrice?: true
    purchasePricePerUnit?: true
    calculatedPrice?: true
    roundedPrice?: true
  }

  export type InvoiceItemSumAggregateInputType = {
    id?: true
    invoiceId?: true
    productId?: true
    boxSize?: true
    quantity?: true
    boxesCount?: true
    purchasePrice?: true
    purchasePricePerUnit?: true
    calculatedPrice?: true
    roundedPrice?: true
  }

  export type InvoiceItemMinAggregateInputType = {
    id?: true
    invoiceId?: true
    productId?: true
    productName?: true
    unitType?: true
    boxSize?: true
    quantity?: true
    boxesCount?: true
    purchasePrice?: true
    purchasePricePerUnit?: true
    calculatedPrice?: true
    roundedPrice?: true
    priceChanged?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InvoiceItemMaxAggregateInputType = {
    id?: true
    invoiceId?: true
    productId?: true
    productName?: true
    unitType?: true
    boxSize?: true
    quantity?: true
    boxesCount?: true
    purchasePrice?: true
    purchasePricePerUnit?: true
    calculatedPrice?: true
    roundedPrice?: true
    priceChanged?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InvoiceItemCountAggregateInputType = {
    id?: true
    invoiceId?: true
    productId?: true
    productName?: true
    unitType?: true
    boxSize?: true
    quantity?: true
    boxesCount?: true
    purchasePrice?: true
    purchasePricePerUnit?: true
    calculatedPrice?: true
    roundedPrice?: true
    priceChanged?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InvoiceItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InvoiceItem to aggregate.
     */
    where?: InvoiceItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvoiceItems to fetch.
     */
    orderBy?: InvoiceItemOrderByWithRelationInput | InvoiceItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvoiceItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvoiceItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvoiceItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InvoiceItems
    **/
    _count?: true | InvoiceItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InvoiceItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InvoiceItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvoiceItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvoiceItemMaxAggregateInputType
  }

  export type GetInvoiceItemAggregateType<T extends InvoiceItemAggregateArgs> = {
        [P in keyof T & keyof AggregateInvoiceItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvoiceItem[P]>
      : GetScalarType<T[P], AggregateInvoiceItem[P]>
  }




  export type InvoiceItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoiceItemWhereInput
    orderBy?: InvoiceItemOrderByWithAggregationInput | InvoiceItemOrderByWithAggregationInput[]
    by: InvoiceItemScalarFieldEnum[] | InvoiceItemScalarFieldEnum
    having?: InvoiceItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvoiceItemCountAggregateInputType | true
    _avg?: InvoiceItemAvgAggregateInputType
    _sum?: InvoiceItemSumAggregateInputType
    _min?: InvoiceItemMinAggregateInputType
    _max?: InvoiceItemMaxAggregateInputType
  }

  export type InvoiceItemGroupByOutputType = {
    id: number
    invoiceId: number
    productId: number | null
    productName: string
    unitType: $Enums.UnitType
    boxSize: number | null
    quantity: number
    boxesCount: number | null
    purchasePrice: bigint
    purchasePricePerUnit: bigint | null
    calculatedPrice: bigint
    roundedPrice: bigint
    priceChanged: boolean
    createdAt: Date
    updatedAt: Date
    _count: InvoiceItemCountAggregateOutputType | null
    _avg: InvoiceItemAvgAggregateOutputType | null
    _sum: InvoiceItemSumAggregateOutputType | null
    _min: InvoiceItemMinAggregateOutputType | null
    _max: InvoiceItemMaxAggregateOutputType | null
  }

  type GetInvoiceItemGroupByPayload<T extends InvoiceItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvoiceItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvoiceItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvoiceItemGroupByOutputType[P]>
            : GetScalarType<T[P], InvoiceItemGroupByOutputType[P]>
        }
      >
    >


  export type InvoiceItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invoiceId?: boolean
    productId?: boolean
    productName?: boolean
    unitType?: boolean
    boxSize?: boolean
    quantity?: boolean
    boxesCount?: boolean
    purchasePrice?: boolean
    purchasePricePerUnit?: boolean
    calculatedPrice?: boolean
    roundedPrice?: boolean
    priceChanged?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    invoice?: boolean | InvoiceDefaultArgs<ExtArgs>
    product?: boolean | InvoiceItem$productArgs<ExtArgs>
  }, ExtArgs["result"]["invoiceItem"]>

  export type InvoiceItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invoiceId?: boolean
    productId?: boolean
    productName?: boolean
    unitType?: boolean
    boxSize?: boolean
    quantity?: boolean
    boxesCount?: boolean
    purchasePrice?: boolean
    purchasePricePerUnit?: boolean
    calculatedPrice?: boolean
    roundedPrice?: boolean
    priceChanged?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    invoice?: boolean | InvoiceDefaultArgs<ExtArgs>
    product?: boolean | InvoiceItem$productArgs<ExtArgs>
  }, ExtArgs["result"]["invoiceItem"]>

  export type InvoiceItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invoiceId?: boolean
    productId?: boolean
    productName?: boolean
    unitType?: boolean
    boxSize?: boolean
    quantity?: boolean
    boxesCount?: boolean
    purchasePrice?: boolean
    purchasePricePerUnit?: boolean
    calculatedPrice?: boolean
    roundedPrice?: boolean
    priceChanged?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    invoice?: boolean | InvoiceDefaultArgs<ExtArgs>
    product?: boolean | InvoiceItem$productArgs<ExtArgs>
  }, ExtArgs["result"]["invoiceItem"]>

  export type InvoiceItemSelectScalar = {
    id?: boolean
    invoiceId?: boolean
    productId?: boolean
    productName?: boolean
    unitType?: boolean
    boxSize?: boolean
    quantity?: boolean
    boxesCount?: boolean
    purchasePrice?: boolean
    purchasePricePerUnit?: boolean
    calculatedPrice?: boolean
    roundedPrice?: boolean
    priceChanged?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InvoiceItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "invoiceId" | "productId" | "productName" | "unitType" | "boxSize" | "quantity" | "boxesCount" | "purchasePrice" | "purchasePricePerUnit" | "calculatedPrice" | "roundedPrice" | "priceChanged" | "createdAt" | "updatedAt", ExtArgs["result"]["invoiceItem"]>
  export type InvoiceItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invoice?: boolean | InvoiceDefaultArgs<ExtArgs>
    product?: boolean | InvoiceItem$productArgs<ExtArgs>
  }
  export type InvoiceItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invoice?: boolean | InvoiceDefaultArgs<ExtArgs>
    product?: boolean | InvoiceItem$productArgs<ExtArgs>
  }
  export type InvoiceItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invoice?: boolean | InvoiceDefaultArgs<ExtArgs>
    product?: boolean | InvoiceItem$productArgs<ExtArgs>
  }

  export type $InvoiceItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InvoiceItem"
    objects: {
      invoice: Prisma.$InvoicePayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      invoiceId: number
      productId: number | null
      productName: string
      unitType: $Enums.UnitType
      boxSize: number | null
      quantity: number
      boxesCount: number | null
      purchasePrice: bigint
      purchasePricePerUnit: bigint | null
      calculatedPrice: bigint
      roundedPrice: bigint
      priceChanged: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["invoiceItem"]>
    composites: {}
  }

  type InvoiceItemGetPayload<S extends boolean | null | undefined | InvoiceItemDefaultArgs> = $Result.GetResult<Prisma.$InvoiceItemPayload, S>

  type InvoiceItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InvoiceItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InvoiceItemCountAggregateInputType | true
    }

  export interface InvoiceItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InvoiceItem'], meta: { name: 'InvoiceItem' } }
    /**
     * Find zero or one InvoiceItem that matches the filter.
     * @param {InvoiceItemFindUniqueArgs} args - Arguments to find a InvoiceItem
     * @example
     * // Get one InvoiceItem
     * const invoiceItem = await prisma.invoiceItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvoiceItemFindUniqueArgs>(args: SelectSubset<T, InvoiceItemFindUniqueArgs<ExtArgs>>): Prisma__InvoiceItemClient<$Result.GetResult<Prisma.$InvoiceItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one InvoiceItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InvoiceItemFindUniqueOrThrowArgs} args - Arguments to find a InvoiceItem
     * @example
     * // Get one InvoiceItem
     * const invoiceItem = await prisma.invoiceItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvoiceItemFindUniqueOrThrowArgs>(args: SelectSubset<T, InvoiceItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvoiceItemClient<$Result.GetResult<Prisma.$InvoiceItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InvoiceItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceItemFindFirstArgs} args - Arguments to find a InvoiceItem
     * @example
     * // Get one InvoiceItem
     * const invoiceItem = await prisma.invoiceItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvoiceItemFindFirstArgs>(args?: SelectSubset<T, InvoiceItemFindFirstArgs<ExtArgs>>): Prisma__InvoiceItemClient<$Result.GetResult<Prisma.$InvoiceItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InvoiceItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceItemFindFirstOrThrowArgs} args - Arguments to find a InvoiceItem
     * @example
     * // Get one InvoiceItem
     * const invoiceItem = await prisma.invoiceItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvoiceItemFindFirstOrThrowArgs>(args?: SelectSubset<T, InvoiceItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvoiceItemClient<$Result.GetResult<Prisma.$InvoiceItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more InvoiceItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InvoiceItems
     * const invoiceItems = await prisma.invoiceItem.findMany()
     * 
     * // Get first 10 InvoiceItems
     * const invoiceItems = await prisma.invoiceItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const invoiceItemWithIdOnly = await prisma.invoiceItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InvoiceItemFindManyArgs>(args?: SelectSubset<T, InvoiceItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoiceItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a InvoiceItem.
     * @param {InvoiceItemCreateArgs} args - Arguments to create a InvoiceItem.
     * @example
     * // Create one InvoiceItem
     * const InvoiceItem = await prisma.invoiceItem.create({
     *   data: {
     *     // ... data to create a InvoiceItem
     *   }
     * })
     * 
     */
    create<T extends InvoiceItemCreateArgs>(args: SelectSubset<T, InvoiceItemCreateArgs<ExtArgs>>): Prisma__InvoiceItemClient<$Result.GetResult<Prisma.$InvoiceItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many InvoiceItems.
     * @param {InvoiceItemCreateManyArgs} args - Arguments to create many InvoiceItems.
     * @example
     * // Create many InvoiceItems
     * const invoiceItem = await prisma.invoiceItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvoiceItemCreateManyArgs>(args?: SelectSubset<T, InvoiceItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InvoiceItems and returns the data saved in the database.
     * @param {InvoiceItemCreateManyAndReturnArgs} args - Arguments to create many InvoiceItems.
     * @example
     * // Create many InvoiceItems
     * const invoiceItem = await prisma.invoiceItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InvoiceItems and only return the `id`
     * const invoiceItemWithIdOnly = await prisma.invoiceItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InvoiceItemCreateManyAndReturnArgs>(args?: SelectSubset<T, InvoiceItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoiceItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a InvoiceItem.
     * @param {InvoiceItemDeleteArgs} args - Arguments to delete one InvoiceItem.
     * @example
     * // Delete one InvoiceItem
     * const InvoiceItem = await prisma.invoiceItem.delete({
     *   where: {
     *     // ... filter to delete one InvoiceItem
     *   }
     * })
     * 
     */
    delete<T extends InvoiceItemDeleteArgs>(args: SelectSubset<T, InvoiceItemDeleteArgs<ExtArgs>>): Prisma__InvoiceItemClient<$Result.GetResult<Prisma.$InvoiceItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one InvoiceItem.
     * @param {InvoiceItemUpdateArgs} args - Arguments to update one InvoiceItem.
     * @example
     * // Update one InvoiceItem
     * const invoiceItem = await prisma.invoiceItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvoiceItemUpdateArgs>(args: SelectSubset<T, InvoiceItemUpdateArgs<ExtArgs>>): Prisma__InvoiceItemClient<$Result.GetResult<Prisma.$InvoiceItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more InvoiceItems.
     * @param {InvoiceItemDeleteManyArgs} args - Arguments to filter InvoiceItems to delete.
     * @example
     * // Delete a few InvoiceItems
     * const { count } = await prisma.invoiceItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvoiceItemDeleteManyArgs>(args?: SelectSubset<T, InvoiceItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InvoiceItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InvoiceItems
     * const invoiceItem = await prisma.invoiceItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvoiceItemUpdateManyArgs>(args: SelectSubset<T, InvoiceItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InvoiceItems and returns the data updated in the database.
     * @param {InvoiceItemUpdateManyAndReturnArgs} args - Arguments to update many InvoiceItems.
     * @example
     * // Update many InvoiceItems
     * const invoiceItem = await prisma.invoiceItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more InvoiceItems and only return the `id`
     * const invoiceItemWithIdOnly = await prisma.invoiceItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InvoiceItemUpdateManyAndReturnArgs>(args: SelectSubset<T, InvoiceItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoiceItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one InvoiceItem.
     * @param {InvoiceItemUpsertArgs} args - Arguments to update or create a InvoiceItem.
     * @example
     * // Update or create a InvoiceItem
     * const invoiceItem = await prisma.invoiceItem.upsert({
     *   create: {
     *     // ... data to create a InvoiceItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InvoiceItem we want to update
     *   }
     * })
     */
    upsert<T extends InvoiceItemUpsertArgs>(args: SelectSubset<T, InvoiceItemUpsertArgs<ExtArgs>>): Prisma__InvoiceItemClient<$Result.GetResult<Prisma.$InvoiceItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of InvoiceItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceItemCountArgs} args - Arguments to filter InvoiceItems to count.
     * @example
     * // Count the number of InvoiceItems
     * const count = await prisma.invoiceItem.count({
     *   where: {
     *     // ... the filter for the InvoiceItems we want to count
     *   }
     * })
    **/
    count<T extends InvoiceItemCountArgs>(
      args?: Subset<T, InvoiceItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvoiceItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InvoiceItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvoiceItemAggregateArgs>(args: Subset<T, InvoiceItemAggregateArgs>): Prisma.PrismaPromise<GetInvoiceItemAggregateType<T>>

    /**
     * Group by InvoiceItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoiceItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InvoiceItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvoiceItemGroupByArgs['orderBy'] }
        : { orderBy?: InvoiceItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InvoiceItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvoiceItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InvoiceItem model
   */
  readonly fields: InvoiceItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InvoiceItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvoiceItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    invoice<T extends InvoiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InvoiceDefaultArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    product<T extends InvoiceItem$productArgs<ExtArgs> = {}>(args?: Subset<T, InvoiceItem$productArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the InvoiceItem model
   */
  interface InvoiceItemFieldRefs {
    readonly id: FieldRef<"InvoiceItem", 'Int'>
    readonly invoiceId: FieldRef<"InvoiceItem", 'Int'>
    readonly productId: FieldRef<"InvoiceItem", 'Int'>
    readonly productName: FieldRef<"InvoiceItem", 'String'>
    readonly unitType: FieldRef<"InvoiceItem", 'UnitType'>
    readonly boxSize: FieldRef<"InvoiceItem", 'Int'>
    readonly quantity: FieldRef<"InvoiceItem", 'Int'>
    readonly boxesCount: FieldRef<"InvoiceItem", 'Int'>
    readonly purchasePrice: FieldRef<"InvoiceItem", 'BigInt'>
    readonly purchasePricePerUnit: FieldRef<"InvoiceItem", 'BigInt'>
    readonly calculatedPrice: FieldRef<"InvoiceItem", 'BigInt'>
    readonly roundedPrice: FieldRef<"InvoiceItem", 'BigInt'>
    readonly priceChanged: FieldRef<"InvoiceItem", 'Boolean'>
    readonly createdAt: FieldRef<"InvoiceItem", 'DateTime'>
    readonly updatedAt: FieldRef<"InvoiceItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * InvoiceItem findUnique
   */
  export type InvoiceItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceItem
     */
    select?: InvoiceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceItem
     */
    omit?: InvoiceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceItemInclude<ExtArgs> | null
    /**
     * Filter, which InvoiceItem to fetch.
     */
    where: InvoiceItemWhereUniqueInput
  }

  /**
   * InvoiceItem findUniqueOrThrow
   */
  export type InvoiceItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceItem
     */
    select?: InvoiceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceItem
     */
    omit?: InvoiceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceItemInclude<ExtArgs> | null
    /**
     * Filter, which InvoiceItem to fetch.
     */
    where: InvoiceItemWhereUniqueInput
  }

  /**
   * InvoiceItem findFirst
   */
  export type InvoiceItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceItem
     */
    select?: InvoiceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceItem
     */
    omit?: InvoiceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceItemInclude<ExtArgs> | null
    /**
     * Filter, which InvoiceItem to fetch.
     */
    where?: InvoiceItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvoiceItems to fetch.
     */
    orderBy?: InvoiceItemOrderByWithRelationInput | InvoiceItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InvoiceItems.
     */
    cursor?: InvoiceItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvoiceItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvoiceItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InvoiceItems.
     */
    distinct?: InvoiceItemScalarFieldEnum | InvoiceItemScalarFieldEnum[]
  }

  /**
   * InvoiceItem findFirstOrThrow
   */
  export type InvoiceItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceItem
     */
    select?: InvoiceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceItem
     */
    omit?: InvoiceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceItemInclude<ExtArgs> | null
    /**
     * Filter, which InvoiceItem to fetch.
     */
    where?: InvoiceItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvoiceItems to fetch.
     */
    orderBy?: InvoiceItemOrderByWithRelationInput | InvoiceItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InvoiceItems.
     */
    cursor?: InvoiceItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvoiceItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvoiceItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InvoiceItems.
     */
    distinct?: InvoiceItemScalarFieldEnum | InvoiceItemScalarFieldEnum[]
  }

  /**
   * InvoiceItem findMany
   */
  export type InvoiceItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceItem
     */
    select?: InvoiceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceItem
     */
    omit?: InvoiceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceItemInclude<ExtArgs> | null
    /**
     * Filter, which InvoiceItems to fetch.
     */
    where?: InvoiceItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvoiceItems to fetch.
     */
    orderBy?: InvoiceItemOrderByWithRelationInput | InvoiceItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InvoiceItems.
     */
    cursor?: InvoiceItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvoiceItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvoiceItems.
     */
    skip?: number
    distinct?: InvoiceItemScalarFieldEnum | InvoiceItemScalarFieldEnum[]
  }

  /**
   * InvoiceItem create
   */
  export type InvoiceItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceItem
     */
    select?: InvoiceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceItem
     */
    omit?: InvoiceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceItemInclude<ExtArgs> | null
    /**
     * The data needed to create a InvoiceItem.
     */
    data: XOR<InvoiceItemCreateInput, InvoiceItemUncheckedCreateInput>
  }

  /**
   * InvoiceItem createMany
   */
  export type InvoiceItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InvoiceItems.
     */
    data: InvoiceItemCreateManyInput | InvoiceItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InvoiceItem createManyAndReturn
   */
  export type InvoiceItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceItem
     */
    select?: InvoiceItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceItem
     */
    omit?: InvoiceItemOmit<ExtArgs> | null
    /**
     * The data used to create many InvoiceItems.
     */
    data: InvoiceItemCreateManyInput | InvoiceItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * InvoiceItem update
   */
  export type InvoiceItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceItem
     */
    select?: InvoiceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceItem
     */
    omit?: InvoiceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceItemInclude<ExtArgs> | null
    /**
     * The data needed to update a InvoiceItem.
     */
    data: XOR<InvoiceItemUpdateInput, InvoiceItemUncheckedUpdateInput>
    /**
     * Choose, which InvoiceItem to update.
     */
    where: InvoiceItemWhereUniqueInput
  }

  /**
   * InvoiceItem updateMany
   */
  export type InvoiceItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InvoiceItems.
     */
    data: XOR<InvoiceItemUpdateManyMutationInput, InvoiceItemUncheckedUpdateManyInput>
    /**
     * Filter which InvoiceItems to update
     */
    where?: InvoiceItemWhereInput
    /**
     * Limit how many InvoiceItems to update.
     */
    limit?: number
  }

  /**
   * InvoiceItem updateManyAndReturn
   */
  export type InvoiceItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceItem
     */
    select?: InvoiceItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceItem
     */
    omit?: InvoiceItemOmit<ExtArgs> | null
    /**
     * The data used to update InvoiceItems.
     */
    data: XOR<InvoiceItemUpdateManyMutationInput, InvoiceItemUncheckedUpdateManyInput>
    /**
     * Filter which InvoiceItems to update
     */
    where?: InvoiceItemWhereInput
    /**
     * Limit how many InvoiceItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * InvoiceItem upsert
   */
  export type InvoiceItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceItem
     */
    select?: InvoiceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceItem
     */
    omit?: InvoiceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceItemInclude<ExtArgs> | null
    /**
     * The filter to search for the InvoiceItem to update in case it exists.
     */
    where: InvoiceItemWhereUniqueInput
    /**
     * In case the InvoiceItem found by the `where` argument doesn't exist, create a new InvoiceItem with this data.
     */
    create: XOR<InvoiceItemCreateInput, InvoiceItemUncheckedCreateInput>
    /**
     * In case the InvoiceItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvoiceItemUpdateInput, InvoiceItemUncheckedUpdateInput>
  }

  /**
   * InvoiceItem delete
   */
  export type InvoiceItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceItem
     */
    select?: InvoiceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceItem
     */
    omit?: InvoiceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceItemInclude<ExtArgs> | null
    /**
     * Filter which InvoiceItem to delete.
     */
    where: InvoiceItemWhereUniqueInput
  }

  /**
   * InvoiceItem deleteMany
   */
  export type InvoiceItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InvoiceItems to delete
     */
    where?: InvoiceItemWhereInput
    /**
     * Limit how many InvoiceItems to delete.
     */
    limit?: number
  }

  /**
   * InvoiceItem.product
   */
  export type InvoiceItem$productArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
  }

  /**
   * InvoiceItem without action
   */
  export type InvoiceItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoiceItem
     */
    select?: InvoiceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoiceItem
     */
    omit?: InvoiceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoiceItemInclude<ExtArgs> | null
  }


  /**
   * Model RawInvoiceItem
   */

  export type AggregateRawInvoiceItem = {
    _count: RawInvoiceItemCountAggregateOutputType | null
    _avg: RawInvoiceItemAvgAggregateOutputType | null
    _sum: RawInvoiceItemSumAggregateOutputType | null
    _min: RawInvoiceItemMinAggregateOutputType | null
    _max: RawInvoiceItemMaxAggregateOutputType | null
  }

  export type RawInvoiceItemAvgAggregateOutputType = {
    id: number | null
    invoicePhotoId: number | null
    rowIndex: number | null
  }

  export type RawInvoiceItemSumAggregateOutputType = {
    id: number | null
    invoicePhotoId: number | null
    rowIndex: number | null
  }

  export type RawInvoiceItemMinAggregateOutputType = {
    id: number | null
    invoicePhotoId: number | null
    rowIndex: number | null
    description: string | null
    rawQuantity: string | null
    rawUnitPrice: string | null
    rawAmount: string | null
    createdAt: Date | null
  }

  export type RawInvoiceItemMaxAggregateOutputType = {
    id: number | null
    invoicePhotoId: number | null
    rowIndex: number | null
    description: string | null
    rawQuantity: string | null
    rawUnitPrice: string | null
    rawAmount: string | null
    createdAt: Date | null
  }

  export type RawInvoiceItemCountAggregateOutputType = {
    id: number
    invoicePhotoId: number
    rowIndex: number
    description: number
    rawQuantity: number
    rawUnitPrice: number
    rawAmount: number
    createdAt: number
    _all: number
  }


  export type RawInvoiceItemAvgAggregateInputType = {
    id?: true
    invoicePhotoId?: true
    rowIndex?: true
  }

  export type RawInvoiceItemSumAggregateInputType = {
    id?: true
    invoicePhotoId?: true
    rowIndex?: true
  }

  export type RawInvoiceItemMinAggregateInputType = {
    id?: true
    invoicePhotoId?: true
    rowIndex?: true
    description?: true
    rawQuantity?: true
    rawUnitPrice?: true
    rawAmount?: true
    createdAt?: true
  }

  export type RawInvoiceItemMaxAggregateInputType = {
    id?: true
    invoicePhotoId?: true
    rowIndex?: true
    description?: true
    rawQuantity?: true
    rawUnitPrice?: true
    rawAmount?: true
    createdAt?: true
  }

  export type RawInvoiceItemCountAggregateInputType = {
    id?: true
    invoicePhotoId?: true
    rowIndex?: true
    description?: true
    rawQuantity?: true
    rawUnitPrice?: true
    rawAmount?: true
    createdAt?: true
    _all?: true
  }

  export type RawInvoiceItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RawInvoiceItem to aggregate.
     */
    where?: RawInvoiceItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RawInvoiceItems to fetch.
     */
    orderBy?: RawInvoiceItemOrderByWithRelationInput | RawInvoiceItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RawInvoiceItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RawInvoiceItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RawInvoiceItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RawInvoiceItems
    **/
    _count?: true | RawInvoiceItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RawInvoiceItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RawInvoiceItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RawInvoiceItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RawInvoiceItemMaxAggregateInputType
  }

  export type GetRawInvoiceItemAggregateType<T extends RawInvoiceItemAggregateArgs> = {
        [P in keyof T & keyof AggregateRawInvoiceItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRawInvoiceItem[P]>
      : GetScalarType<T[P], AggregateRawInvoiceItem[P]>
  }




  export type RawInvoiceItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RawInvoiceItemWhereInput
    orderBy?: RawInvoiceItemOrderByWithAggregationInput | RawInvoiceItemOrderByWithAggregationInput[]
    by: RawInvoiceItemScalarFieldEnum[] | RawInvoiceItemScalarFieldEnum
    having?: RawInvoiceItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RawInvoiceItemCountAggregateInputType | true
    _avg?: RawInvoiceItemAvgAggregateInputType
    _sum?: RawInvoiceItemSumAggregateInputType
    _min?: RawInvoiceItemMinAggregateInputType
    _max?: RawInvoiceItemMaxAggregateInputType
  }

  export type RawInvoiceItemGroupByOutputType = {
    id: number
    invoicePhotoId: number
    rowIndex: number
    description: string
    rawQuantity: string | null
    rawUnitPrice: string | null
    rawAmount: string | null
    createdAt: Date
    _count: RawInvoiceItemCountAggregateOutputType | null
    _avg: RawInvoiceItemAvgAggregateOutputType | null
    _sum: RawInvoiceItemSumAggregateOutputType | null
    _min: RawInvoiceItemMinAggregateOutputType | null
    _max: RawInvoiceItemMaxAggregateOutputType | null
  }

  type GetRawInvoiceItemGroupByPayload<T extends RawInvoiceItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RawInvoiceItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RawInvoiceItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RawInvoiceItemGroupByOutputType[P]>
            : GetScalarType<T[P], RawInvoiceItemGroupByOutputType[P]>
        }
      >
    >


  export type RawInvoiceItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invoicePhotoId?: boolean
    rowIndex?: boolean
    description?: boolean
    rawQuantity?: boolean
    rawUnitPrice?: boolean
    rawAmount?: boolean
    createdAt?: boolean
    invoicePhoto?: boolean | InvoicePhotoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rawInvoiceItem"]>

  export type RawInvoiceItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invoicePhotoId?: boolean
    rowIndex?: boolean
    description?: boolean
    rawQuantity?: boolean
    rawUnitPrice?: boolean
    rawAmount?: boolean
    createdAt?: boolean
    invoicePhoto?: boolean | InvoicePhotoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rawInvoiceItem"]>

  export type RawInvoiceItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invoicePhotoId?: boolean
    rowIndex?: boolean
    description?: boolean
    rawQuantity?: boolean
    rawUnitPrice?: boolean
    rawAmount?: boolean
    createdAt?: boolean
    invoicePhoto?: boolean | InvoicePhotoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rawInvoiceItem"]>

  export type RawInvoiceItemSelectScalar = {
    id?: boolean
    invoicePhotoId?: boolean
    rowIndex?: boolean
    description?: boolean
    rawQuantity?: boolean
    rawUnitPrice?: boolean
    rawAmount?: boolean
    createdAt?: boolean
  }

  export type RawInvoiceItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "invoicePhotoId" | "rowIndex" | "description" | "rawQuantity" | "rawUnitPrice" | "rawAmount" | "createdAt", ExtArgs["result"]["rawInvoiceItem"]>
  export type RawInvoiceItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invoicePhoto?: boolean | InvoicePhotoDefaultArgs<ExtArgs>
  }
  export type RawInvoiceItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invoicePhoto?: boolean | InvoicePhotoDefaultArgs<ExtArgs>
  }
  export type RawInvoiceItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invoicePhoto?: boolean | InvoicePhotoDefaultArgs<ExtArgs>
  }

  export type $RawInvoiceItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RawInvoiceItem"
    objects: {
      invoicePhoto: Prisma.$InvoicePhotoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      invoicePhotoId: number
      rowIndex: number
      description: string
      rawQuantity: string | null
      rawUnitPrice: string | null
      rawAmount: string | null
      createdAt: Date
    }, ExtArgs["result"]["rawInvoiceItem"]>
    composites: {}
  }

  type RawInvoiceItemGetPayload<S extends boolean | null | undefined | RawInvoiceItemDefaultArgs> = $Result.GetResult<Prisma.$RawInvoiceItemPayload, S>

  type RawInvoiceItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RawInvoiceItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RawInvoiceItemCountAggregateInputType | true
    }

  export interface RawInvoiceItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RawInvoiceItem'], meta: { name: 'RawInvoiceItem' } }
    /**
     * Find zero or one RawInvoiceItem that matches the filter.
     * @param {RawInvoiceItemFindUniqueArgs} args - Arguments to find a RawInvoiceItem
     * @example
     * // Get one RawInvoiceItem
     * const rawInvoiceItem = await prisma.rawInvoiceItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RawInvoiceItemFindUniqueArgs>(args: SelectSubset<T, RawInvoiceItemFindUniqueArgs<ExtArgs>>): Prisma__RawInvoiceItemClient<$Result.GetResult<Prisma.$RawInvoiceItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RawInvoiceItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RawInvoiceItemFindUniqueOrThrowArgs} args - Arguments to find a RawInvoiceItem
     * @example
     * // Get one RawInvoiceItem
     * const rawInvoiceItem = await prisma.rawInvoiceItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RawInvoiceItemFindUniqueOrThrowArgs>(args: SelectSubset<T, RawInvoiceItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RawInvoiceItemClient<$Result.GetResult<Prisma.$RawInvoiceItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RawInvoiceItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RawInvoiceItemFindFirstArgs} args - Arguments to find a RawInvoiceItem
     * @example
     * // Get one RawInvoiceItem
     * const rawInvoiceItem = await prisma.rawInvoiceItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RawInvoiceItemFindFirstArgs>(args?: SelectSubset<T, RawInvoiceItemFindFirstArgs<ExtArgs>>): Prisma__RawInvoiceItemClient<$Result.GetResult<Prisma.$RawInvoiceItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RawInvoiceItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RawInvoiceItemFindFirstOrThrowArgs} args - Arguments to find a RawInvoiceItem
     * @example
     * // Get one RawInvoiceItem
     * const rawInvoiceItem = await prisma.rawInvoiceItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RawInvoiceItemFindFirstOrThrowArgs>(args?: SelectSubset<T, RawInvoiceItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__RawInvoiceItemClient<$Result.GetResult<Prisma.$RawInvoiceItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RawInvoiceItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RawInvoiceItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RawInvoiceItems
     * const rawInvoiceItems = await prisma.rawInvoiceItem.findMany()
     * 
     * // Get first 10 RawInvoiceItems
     * const rawInvoiceItems = await prisma.rawInvoiceItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rawInvoiceItemWithIdOnly = await prisma.rawInvoiceItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RawInvoiceItemFindManyArgs>(args?: SelectSubset<T, RawInvoiceItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RawInvoiceItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RawInvoiceItem.
     * @param {RawInvoiceItemCreateArgs} args - Arguments to create a RawInvoiceItem.
     * @example
     * // Create one RawInvoiceItem
     * const RawInvoiceItem = await prisma.rawInvoiceItem.create({
     *   data: {
     *     // ... data to create a RawInvoiceItem
     *   }
     * })
     * 
     */
    create<T extends RawInvoiceItemCreateArgs>(args: SelectSubset<T, RawInvoiceItemCreateArgs<ExtArgs>>): Prisma__RawInvoiceItemClient<$Result.GetResult<Prisma.$RawInvoiceItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RawInvoiceItems.
     * @param {RawInvoiceItemCreateManyArgs} args - Arguments to create many RawInvoiceItems.
     * @example
     * // Create many RawInvoiceItems
     * const rawInvoiceItem = await prisma.rawInvoiceItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RawInvoiceItemCreateManyArgs>(args?: SelectSubset<T, RawInvoiceItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RawInvoiceItems and returns the data saved in the database.
     * @param {RawInvoiceItemCreateManyAndReturnArgs} args - Arguments to create many RawInvoiceItems.
     * @example
     * // Create many RawInvoiceItems
     * const rawInvoiceItem = await prisma.rawInvoiceItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RawInvoiceItems and only return the `id`
     * const rawInvoiceItemWithIdOnly = await prisma.rawInvoiceItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RawInvoiceItemCreateManyAndReturnArgs>(args?: SelectSubset<T, RawInvoiceItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RawInvoiceItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RawInvoiceItem.
     * @param {RawInvoiceItemDeleteArgs} args - Arguments to delete one RawInvoiceItem.
     * @example
     * // Delete one RawInvoiceItem
     * const RawInvoiceItem = await prisma.rawInvoiceItem.delete({
     *   where: {
     *     // ... filter to delete one RawInvoiceItem
     *   }
     * })
     * 
     */
    delete<T extends RawInvoiceItemDeleteArgs>(args: SelectSubset<T, RawInvoiceItemDeleteArgs<ExtArgs>>): Prisma__RawInvoiceItemClient<$Result.GetResult<Prisma.$RawInvoiceItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RawInvoiceItem.
     * @param {RawInvoiceItemUpdateArgs} args - Arguments to update one RawInvoiceItem.
     * @example
     * // Update one RawInvoiceItem
     * const rawInvoiceItem = await prisma.rawInvoiceItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RawInvoiceItemUpdateArgs>(args: SelectSubset<T, RawInvoiceItemUpdateArgs<ExtArgs>>): Prisma__RawInvoiceItemClient<$Result.GetResult<Prisma.$RawInvoiceItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RawInvoiceItems.
     * @param {RawInvoiceItemDeleteManyArgs} args - Arguments to filter RawInvoiceItems to delete.
     * @example
     * // Delete a few RawInvoiceItems
     * const { count } = await prisma.rawInvoiceItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RawInvoiceItemDeleteManyArgs>(args?: SelectSubset<T, RawInvoiceItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RawInvoiceItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RawInvoiceItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RawInvoiceItems
     * const rawInvoiceItem = await prisma.rawInvoiceItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RawInvoiceItemUpdateManyArgs>(args: SelectSubset<T, RawInvoiceItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RawInvoiceItems and returns the data updated in the database.
     * @param {RawInvoiceItemUpdateManyAndReturnArgs} args - Arguments to update many RawInvoiceItems.
     * @example
     * // Update many RawInvoiceItems
     * const rawInvoiceItem = await prisma.rawInvoiceItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RawInvoiceItems and only return the `id`
     * const rawInvoiceItemWithIdOnly = await prisma.rawInvoiceItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RawInvoiceItemUpdateManyAndReturnArgs>(args: SelectSubset<T, RawInvoiceItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RawInvoiceItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RawInvoiceItem.
     * @param {RawInvoiceItemUpsertArgs} args - Arguments to update or create a RawInvoiceItem.
     * @example
     * // Update or create a RawInvoiceItem
     * const rawInvoiceItem = await prisma.rawInvoiceItem.upsert({
     *   create: {
     *     // ... data to create a RawInvoiceItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RawInvoiceItem we want to update
     *   }
     * })
     */
    upsert<T extends RawInvoiceItemUpsertArgs>(args: SelectSubset<T, RawInvoiceItemUpsertArgs<ExtArgs>>): Prisma__RawInvoiceItemClient<$Result.GetResult<Prisma.$RawInvoiceItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RawInvoiceItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RawInvoiceItemCountArgs} args - Arguments to filter RawInvoiceItems to count.
     * @example
     * // Count the number of RawInvoiceItems
     * const count = await prisma.rawInvoiceItem.count({
     *   where: {
     *     // ... the filter for the RawInvoiceItems we want to count
     *   }
     * })
    **/
    count<T extends RawInvoiceItemCountArgs>(
      args?: Subset<T, RawInvoiceItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RawInvoiceItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RawInvoiceItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RawInvoiceItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RawInvoiceItemAggregateArgs>(args: Subset<T, RawInvoiceItemAggregateArgs>): Prisma.PrismaPromise<GetRawInvoiceItemAggregateType<T>>

    /**
     * Group by RawInvoiceItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RawInvoiceItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RawInvoiceItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RawInvoiceItemGroupByArgs['orderBy'] }
        : { orderBy?: RawInvoiceItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RawInvoiceItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRawInvoiceItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RawInvoiceItem model
   */
  readonly fields: RawInvoiceItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RawInvoiceItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RawInvoiceItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    invoicePhoto<T extends InvoicePhotoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InvoicePhotoDefaultArgs<ExtArgs>>): Prisma__InvoicePhotoClient<$Result.GetResult<Prisma.$InvoicePhotoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RawInvoiceItem model
   */
  interface RawInvoiceItemFieldRefs {
    readonly id: FieldRef<"RawInvoiceItem", 'Int'>
    readonly invoicePhotoId: FieldRef<"RawInvoiceItem", 'Int'>
    readonly rowIndex: FieldRef<"RawInvoiceItem", 'Int'>
    readonly description: FieldRef<"RawInvoiceItem", 'String'>
    readonly rawQuantity: FieldRef<"RawInvoiceItem", 'String'>
    readonly rawUnitPrice: FieldRef<"RawInvoiceItem", 'String'>
    readonly rawAmount: FieldRef<"RawInvoiceItem", 'String'>
    readonly createdAt: FieldRef<"RawInvoiceItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RawInvoiceItem findUnique
   */
  export type RawInvoiceItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawInvoiceItem
     */
    select?: RawInvoiceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RawInvoiceItem
     */
    omit?: RawInvoiceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RawInvoiceItemInclude<ExtArgs> | null
    /**
     * Filter, which RawInvoiceItem to fetch.
     */
    where: RawInvoiceItemWhereUniqueInput
  }

  /**
   * RawInvoiceItem findUniqueOrThrow
   */
  export type RawInvoiceItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawInvoiceItem
     */
    select?: RawInvoiceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RawInvoiceItem
     */
    omit?: RawInvoiceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RawInvoiceItemInclude<ExtArgs> | null
    /**
     * Filter, which RawInvoiceItem to fetch.
     */
    where: RawInvoiceItemWhereUniqueInput
  }

  /**
   * RawInvoiceItem findFirst
   */
  export type RawInvoiceItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawInvoiceItem
     */
    select?: RawInvoiceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RawInvoiceItem
     */
    omit?: RawInvoiceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RawInvoiceItemInclude<ExtArgs> | null
    /**
     * Filter, which RawInvoiceItem to fetch.
     */
    where?: RawInvoiceItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RawInvoiceItems to fetch.
     */
    orderBy?: RawInvoiceItemOrderByWithRelationInput | RawInvoiceItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RawInvoiceItems.
     */
    cursor?: RawInvoiceItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RawInvoiceItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RawInvoiceItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RawInvoiceItems.
     */
    distinct?: RawInvoiceItemScalarFieldEnum | RawInvoiceItemScalarFieldEnum[]
  }

  /**
   * RawInvoiceItem findFirstOrThrow
   */
  export type RawInvoiceItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawInvoiceItem
     */
    select?: RawInvoiceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RawInvoiceItem
     */
    omit?: RawInvoiceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RawInvoiceItemInclude<ExtArgs> | null
    /**
     * Filter, which RawInvoiceItem to fetch.
     */
    where?: RawInvoiceItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RawInvoiceItems to fetch.
     */
    orderBy?: RawInvoiceItemOrderByWithRelationInput | RawInvoiceItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RawInvoiceItems.
     */
    cursor?: RawInvoiceItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RawInvoiceItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RawInvoiceItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RawInvoiceItems.
     */
    distinct?: RawInvoiceItemScalarFieldEnum | RawInvoiceItemScalarFieldEnum[]
  }

  /**
   * RawInvoiceItem findMany
   */
  export type RawInvoiceItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawInvoiceItem
     */
    select?: RawInvoiceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RawInvoiceItem
     */
    omit?: RawInvoiceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RawInvoiceItemInclude<ExtArgs> | null
    /**
     * Filter, which RawInvoiceItems to fetch.
     */
    where?: RawInvoiceItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RawInvoiceItems to fetch.
     */
    orderBy?: RawInvoiceItemOrderByWithRelationInput | RawInvoiceItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RawInvoiceItems.
     */
    cursor?: RawInvoiceItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RawInvoiceItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RawInvoiceItems.
     */
    skip?: number
    distinct?: RawInvoiceItemScalarFieldEnum | RawInvoiceItemScalarFieldEnum[]
  }

  /**
   * RawInvoiceItem create
   */
  export type RawInvoiceItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawInvoiceItem
     */
    select?: RawInvoiceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RawInvoiceItem
     */
    omit?: RawInvoiceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RawInvoiceItemInclude<ExtArgs> | null
    /**
     * The data needed to create a RawInvoiceItem.
     */
    data: XOR<RawInvoiceItemCreateInput, RawInvoiceItemUncheckedCreateInput>
  }

  /**
   * RawInvoiceItem createMany
   */
  export type RawInvoiceItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RawInvoiceItems.
     */
    data: RawInvoiceItemCreateManyInput | RawInvoiceItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RawInvoiceItem createManyAndReturn
   */
  export type RawInvoiceItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawInvoiceItem
     */
    select?: RawInvoiceItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RawInvoiceItem
     */
    omit?: RawInvoiceItemOmit<ExtArgs> | null
    /**
     * The data used to create many RawInvoiceItems.
     */
    data: RawInvoiceItemCreateManyInput | RawInvoiceItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RawInvoiceItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RawInvoiceItem update
   */
  export type RawInvoiceItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawInvoiceItem
     */
    select?: RawInvoiceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RawInvoiceItem
     */
    omit?: RawInvoiceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RawInvoiceItemInclude<ExtArgs> | null
    /**
     * The data needed to update a RawInvoiceItem.
     */
    data: XOR<RawInvoiceItemUpdateInput, RawInvoiceItemUncheckedUpdateInput>
    /**
     * Choose, which RawInvoiceItem to update.
     */
    where: RawInvoiceItemWhereUniqueInput
  }

  /**
   * RawInvoiceItem updateMany
   */
  export type RawInvoiceItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RawInvoiceItems.
     */
    data: XOR<RawInvoiceItemUpdateManyMutationInput, RawInvoiceItemUncheckedUpdateManyInput>
    /**
     * Filter which RawInvoiceItems to update
     */
    where?: RawInvoiceItemWhereInput
    /**
     * Limit how many RawInvoiceItems to update.
     */
    limit?: number
  }

  /**
   * RawInvoiceItem updateManyAndReturn
   */
  export type RawInvoiceItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawInvoiceItem
     */
    select?: RawInvoiceItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RawInvoiceItem
     */
    omit?: RawInvoiceItemOmit<ExtArgs> | null
    /**
     * The data used to update RawInvoiceItems.
     */
    data: XOR<RawInvoiceItemUpdateManyMutationInput, RawInvoiceItemUncheckedUpdateManyInput>
    /**
     * Filter which RawInvoiceItems to update
     */
    where?: RawInvoiceItemWhereInput
    /**
     * Limit how many RawInvoiceItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RawInvoiceItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RawInvoiceItem upsert
   */
  export type RawInvoiceItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawInvoiceItem
     */
    select?: RawInvoiceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RawInvoiceItem
     */
    omit?: RawInvoiceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RawInvoiceItemInclude<ExtArgs> | null
    /**
     * The filter to search for the RawInvoiceItem to update in case it exists.
     */
    where: RawInvoiceItemWhereUniqueInput
    /**
     * In case the RawInvoiceItem found by the `where` argument doesn't exist, create a new RawInvoiceItem with this data.
     */
    create: XOR<RawInvoiceItemCreateInput, RawInvoiceItemUncheckedCreateInput>
    /**
     * In case the RawInvoiceItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RawInvoiceItemUpdateInput, RawInvoiceItemUncheckedUpdateInput>
  }

  /**
   * RawInvoiceItem delete
   */
  export type RawInvoiceItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawInvoiceItem
     */
    select?: RawInvoiceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RawInvoiceItem
     */
    omit?: RawInvoiceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RawInvoiceItemInclude<ExtArgs> | null
    /**
     * Filter which RawInvoiceItem to delete.
     */
    where: RawInvoiceItemWhereUniqueInput
  }

  /**
   * RawInvoiceItem deleteMany
   */
  export type RawInvoiceItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RawInvoiceItems to delete
     */
    where?: RawInvoiceItemWhereInput
    /**
     * Limit how many RawInvoiceItems to delete.
     */
    limit?: number
  }

  /**
   * RawInvoiceItem without action
   */
  export type RawInvoiceItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawInvoiceItem
     */
    select?: RawInvoiceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RawInvoiceItem
     */
    omit?: RawInvoiceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RawInvoiceItemInclude<ExtArgs> | null
  }


  /**
   * Model ProductPriceMemory
   */

  export type AggregateProductPriceMemory = {
    _count: ProductPriceMemoryCountAggregateOutputType | null
    _avg: ProductPriceMemoryAvgAggregateOutputType | null
    _sum: ProductPriceMemorySumAggregateOutputType | null
    _min: ProductPriceMemoryMinAggregateOutputType | null
    _max: ProductPriceMemoryMaxAggregateOutputType | null
  }

  export type ProductPriceMemoryAvgAggregateOutputType = {
    id: number | null
    productId: number | null
    agentId: number | null
    purchasePrice: number | null
    salePrice: number | null
  }

  export type ProductPriceMemorySumAggregateOutputType = {
    id: number | null
    productId: number | null
    agentId: number | null
    purchasePrice: bigint | null
    salePrice: bigint | null
  }

  export type ProductPriceMemoryMinAggregateOutputType = {
    id: number | null
    productId: number | null
    agentId: number | null
    purchasePrice: bigint | null
    salePrice: bigint | null
    source: $Enums.PriceSource | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductPriceMemoryMaxAggregateOutputType = {
    id: number | null
    productId: number | null
    agentId: number | null
    purchasePrice: bigint | null
    salePrice: bigint | null
    source: $Enums.PriceSource | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductPriceMemoryCountAggregateOutputType = {
    id: number
    productId: number
    agentId: number
    purchasePrice: number
    salePrice: number
    source: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductPriceMemoryAvgAggregateInputType = {
    id?: true
    productId?: true
    agentId?: true
    purchasePrice?: true
    salePrice?: true
  }

  export type ProductPriceMemorySumAggregateInputType = {
    id?: true
    productId?: true
    agentId?: true
    purchasePrice?: true
    salePrice?: true
  }

  export type ProductPriceMemoryMinAggregateInputType = {
    id?: true
    productId?: true
    agentId?: true
    purchasePrice?: true
    salePrice?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductPriceMemoryMaxAggregateInputType = {
    id?: true
    productId?: true
    agentId?: true
    purchasePrice?: true
    salePrice?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductPriceMemoryCountAggregateInputType = {
    id?: true
    productId?: true
    agentId?: true
    purchasePrice?: true
    salePrice?: true
    source?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductPriceMemoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductPriceMemory to aggregate.
     */
    where?: ProductPriceMemoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductPriceMemories to fetch.
     */
    orderBy?: ProductPriceMemoryOrderByWithRelationInput | ProductPriceMemoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductPriceMemoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductPriceMemories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductPriceMemories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductPriceMemories
    **/
    _count?: true | ProductPriceMemoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductPriceMemoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductPriceMemorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductPriceMemoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductPriceMemoryMaxAggregateInputType
  }

  export type GetProductPriceMemoryAggregateType<T extends ProductPriceMemoryAggregateArgs> = {
        [P in keyof T & keyof AggregateProductPriceMemory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductPriceMemory[P]>
      : GetScalarType<T[P], AggregateProductPriceMemory[P]>
  }




  export type ProductPriceMemoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductPriceMemoryWhereInput
    orderBy?: ProductPriceMemoryOrderByWithAggregationInput | ProductPriceMemoryOrderByWithAggregationInput[]
    by: ProductPriceMemoryScalarFieldEnum[] | ProductPriceMemoryScalarFieldEnum
    having?: ProductPriceMemoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductPriceMemoryCountAggregateInputType | true
    _avg?: ProductPriceMemoryAvgAggregateInputType
    _sum?: ProductPriceMemorySumAggregateInputType
    _min?: ProductPriceMemoryMinAggregateInputType
    _max?: ProductPriceMemoryMaxAggregateInputType
  }

  export type ProductPriceMemoryGroupByOutputType = {
    id: number
    productId: number
    agentId: number
    purchasePrice: bigint
    salePrice: bigint
    source: $Enums.PriceSource
    createdAt: Date
    updatedAt: Date
    _count: ProductPriceMemoryCountAggregateOutputType | null
    _avg: ProductPriceMemoryAvgAggregateOutputType | null
    _sum: ProductPriceMemorySumAggregateOutputType | null
    _min: ProductPriceMemoryMinAggregateOutputType | null
    _max: ProductPriceMemoryMaxAggregateOutputType | null
  }

  type GetProductPriceMemoryGroupByPayload<T extends ProductPriceMemoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductPriceMemoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductPriceMemoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductPriceMemoryGroupByOutputType[P]>
            : GetScalarType<T[P], ProductPriceMemoryGroupByOutputType[P]>
        }
      >
    >


  export type ProductPriceMemorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    agentId?: boolean
    purchasePrice?: boolean
    salePrice?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productPriceMemory"]>

  export type ProductPriceMemorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    agentId?: boolean
    purchasePrice?: boolean
    salePrice?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productPriceMemory"]>

  export type ProductPriceMemorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    agentId?: boolean
    purchasePrice?: boolean
    salePrice?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productPriceMemory"]>

  export type ProductPriceMemorySelectScalar = {
    id?: boolean
    productId?: boolean
    agentId?: boolean
    purchasePrice?: boolean
    salePrice?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductPriceMemoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "productId" | "agentId" | "purchasePrice" | "salePrice" | "source" | "createdAt" | "updatedAt", ExtArgs["result"]["productPriceMemory"]>
  export type ProductPriceMemoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }
  export type ProductPriceMemoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }
  export type ProductPriceMemoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }

  export type $ProductPriceMemoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductPriceMemory"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
      agent: Prisma.$AgentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      productId: number
      agentId: number
      purchasePrice: bigint
      salePrice: bigint
      source: $Enums.PriceSource
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["productPriceMemory"]>
    composites: {}
  }

  type ProductPriceMemoryGetPayload<S extends boolean | null | undefined | ProductPriceMemoryDefaultArgs> = $Result.GetResult<Prisma.$ProductPriceMemoryPayload, S>

  type ProductPriceMemoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductPriceMemoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductPriceMemoryCountAggregateInputType | true
    }

  export interface ProductPriceMemoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductPriceMemory'], meta: { name: 'ProductPriceMemory' } }
    /**
     * Find zero or one ProductPriceMemory that matches the filter.
     * @param {ProductPriceMemoryFindUniqueArgs} args - Arguments to find a ProductPriceMemory
     * @example
     * // Get one ProductPriceMemory
     * const productPriceMemory = await prisma.productPriceMemory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductPriceMemoryFindUniqueArgs>(args: SelectSubset<T, ProductPriceMemoryFindUniqueArgs<ExtArgs>>): Prisma__ProductPriceMemoryClient<$Result.GetResult<Prisma.$ProductPriceMemoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProductPriceMemory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductPriceMemoryFindUniqueOrThrowArgs} args - Arguments to find a ProductPriceMemory
     * @example
     * // Get one ProductPriceMemory
     * const productPriceMemory = await prisma.productPriceMemory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductPriceMemoryFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductPriceMemoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductPriceMemoryClient<$Result.GetResult<Prisma.$ProductPriceMemoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductPriceMemory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductPriceMemoryFindFirstArgs} args - Arguments to find a ProductPriceMemory
     * @example
     * // Get one ProductPriceMemory
     * const productPriceMemory = await prisma.productPriceMemory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductPriceMemoryFindFirstArgs>(args?: SelectSubset<T, ProductPriceMemoryFindFirstArgs<ExtArgs>>): Prisma__ProductPriceMemoryClient<$Result.GetResult<Prisma.$ProductPriceMemoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductPriceMemory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductPriceMemoryFindFirstOrThrowArgs} args - Arguments to find a ProductPriceMemory
     * @example
     * // Get one ProductPriceMemory
     * const productPriceMemory = await prisma.productPriceMemory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductPriceMemoryFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductPriceMemoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductPriceMemoryClient<$Result.GetResult<Prisma.$ProductPriceMemoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProductPriceMemories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductPriceMemoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductPriceMemories
     * const productPriceMemories = await prisma.productPriceMemory.findMany()
     * 
     * // Get first 10 ProductPriceMemories
     * const productPriceMemories = await prisma.productPriceMemory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productPriceMemoryWithIdOnly = await prisma.productPriceMemory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductPriceMemoryFindManyArgs>(args?: SelectSubset<T, ProductPriceMemoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPriceMemoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProductPriceMemory.
     * @param {ProductPriceMemoryCreateArgs} args - Arguments to create a ProductPriceMemory.
     * @example
     * // Create one ProductPriceMemory
     * const ProductPriceMemory = await prisma.productPriceMemory.create({
     *   data: {
     *     // ... data to create a ProductPriceMemory
     *   }
     * })
     * 
     */
    create<T extends ProductPriceMemoryCreateArgs>(args: SelectSubset<T, ProductPriceMemoryCreateArgs<ExtArgs>>): Prisma__ProductPriceMemoryClient<$Result.GetResult<Prisma.$ProductPriceMemoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProductPriceMemories.
     * @param {ProductPriceMemoryCreateManyArgs} args - Arguments to create many ProductPriceMemories.
     * @example
     * // Create many ProductPriceMemories
     * const productPriceMemory = await prisma.productPriceMemory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductPriceMemoryCreateManyArgs>(args?: SelectSubset<T, ProductPriceMemoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProductPriceMemories and returns the data saved in the database.
     * @param {ProductPriceMemoryCreateManyAndReturnArgs} args - Arguments to create many ProductPriceMemories.
     * @example
     * // Create many ProductPriceMemories
     * const productPriceMemory = await prisma.productPriceMemory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProductPriceMemories and only return the `id`
     * const productPriceMemoryWithIdOnly = await prisma.productPriceMemory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductPriceMemoryCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductPriceMemoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPriceMemoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProductPriceMemory.
     * @param {ProductPriceMemoryDeleteArgs} args - Arguments to delete one ProductPriceMemory.
     * @example
     * // Delete one ProductPriceMemory
     * const ProductPriceMemory = await prisma.productPriceMemory.delete({
     *   where: {
     *     // ... filter to delete one ProductPriceMemory
     *   }
     * })
     * 
     */
    delete<T extends ProductPriceMemoryDeleteArgs>(args: SelectSubset<T, ProductPriceMemoryDeleteArgs<ExtArgs>>): Prisma__ProductPriceMemoryClient<$Result.GetResult<Prisma.$ProductPriceMemoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProductPriceMemory.
     * @param {ProductPriceMemoryUpdateArgs} args - Arguments to update one ProductPriceMemory.
     * @example
     * // Update one ProductPriceMemory
     * const productPriceMemory = await prisma.productPriceMemory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductPriceMemoryUpdateArgs>(args: SelectSubset<T, ProductPriceMemoryUpdateArgs<ExtArgs>>): Prisma__ProductPriceMemoryClient<$Result.GetResult<Prisma.$ProductPriceMemoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProductPriceMemories.
     * @param {ProductPriceMemoryDeleteManyArgs} args - Arguments to filter ProductPriceMemories to delete.
     * @example
     * // Delete a few ProductPriceMemories
     * const { count } = await prisma.productPriceMemory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductPriceMemoryDeleteManyArgs>(args?: SelectSubset<T, ProductPriceMemoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductPriceMemories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductPriceMemoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductPriceMemories
     * const productPriceMemory = await prisma.productPriceMemory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductPriceMemoryUpdateManyArgs>(args: SelectSubset<T, ProductPriceMemoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductPriceMemories and returns the data updated in the database.
     * @param {ProductPriceMemoryUpdateManyAndReturnArgs} args - Arguments to update many ProductPriceMemories.
     * @example
     * // Update many ProductPriceMemories
     * const productPriceMemory = await prisma.productPriceMemory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProductPriceMemories and only return the `id`
     * const productPriceMemoryWithIdOnly = await prisma.productPriceMemory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductPriceMemoryUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductPriceMemoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPriceMemoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProductPriceMemory.
     * @param {ProductPriceMemoryUpsertArgs} args - Arguments to update or create a ProductPriceMemory.
     * @example
     * // Update or create a ProductPriceMemory
     * const productPriceMemory = await prisma.productPriceMemory.upsert({
     *   create: {
     *     // ... data to create a ProductPriceMemory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductPriceMemory we want to update
     *   }
     * })
     */
    upsert<T extends ProductPriceMemoryUpsertArgs>(args: SelectSubset<T, ProductPriceMemoryUpsertArgs<ExtArgs>>): Prisma__ProductPriceMemoryClient<$Result.GetResult<Prisma.$ProductPriceMemoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProductPriceMemories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductPriceMemoryCountArgs} args - Arguments to filter ProductPriceMemories to count.
     * @example
     * // Count the number of ProductPriceMemories
     * const count = await prisma.productPriceMemory.count({
     *   where: {
     *     // ... the filter for the ProductPriceMemories we want to count
     *   }
     * })
    **/
    count<T extends ProductPriceMemoryCountArgs>(
      args?: Subset<T, ProductPriceMemoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductPriceMemoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductPriceMemory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductPriceMemoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductPriceMemoryAggregateArgs>(args: Subset<T, ProductPriceMemoryAggregateArgs>): Prisma.PrismaPromise<GetProductPriceMemoryAggregateType<T>>

    /**
     * Group by ProductPriceMemory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductPriceMemoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductPriceMemoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductPriceMemoryGroupByArgs['orderBy'] }
        : { orderBy?: ProductPriceMemoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductPriceMemoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductPriceMemoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductPriceMemory model
   */
  readonly fields: ProductPriceMemoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductPriceMemory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductPriceMemoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    agent<T extends AgentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AgentDefaultArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProductPriceMemory model
   */
  interface ProductPriceMemoryFieldRefs {
    readonly id: FieldRef<"ProductPriceMemory", 'Int'>
    readonly productId: FieldRef<"ProductPriceMemory", 'Int'>
    readonly agentId: FieldRef<"ProductPriceMemory", 'Int'>
    readonly purchasePrice: FieldRef<"ProductPriceMemory", 'BigInt'>
    readonly salePrice: FieldRef<"ProductPriceMemory", 'BigInt'>
    readonly source: FieldRef<"ProductPriceMemory", 'PriceSource'>
    readonly createdAt: FieldRef<"ProductPriceMemory", 'DateTime'>
    readonly updatedAt: FieldRef<"ProductPriceMemory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProductPriceMemory findUnique
   */
  export type ProductPriceMemoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductPriceMemory
     */
    select?: ProductPriceMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductPriceMemory
     */
    omit?: ProductPriceMemoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductPriceMemoryInclude<ExtArgs> | null
    /**
     * Filter, which ProductPriceMemory to fetch.
     */
    where: ProductPriceMemoryWhereUniqueInput
  }

  /**
   * ProductPriceMemory findUniqueOrThrow
   */
  export type ProductPriceMemoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductPriceMemory
     */
    select?: ProductPriceMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductPriceMemory
     */
    omit?: ProductPriceMemoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductPriceMemoryInclude<ExtArgs> | null
    /**
     * Filter, which ProductPriceMemory to fetch.
     */
    where: ProductPriceMemoryWhereUniqueInput
  }

  /**
   * ProductPriceMemory findFirst
   */
  export type ProductPriceMemoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductPriceMemory
     */
    select?: ProductPriceMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductPriceMemory
     */
    omit?: ProductPriceMemoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductPriceMemoryInclude<ExtArgs> | null
    /**
     * Filter, which ProductPriceMemory to fetch.
     */
    where?: ProductPriceMemoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductPriceMemories to fetch.
     */
    orderBy?: ProductPriceMemoryOrderByWithRelationInput | ProductPriceMemoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductPriceMemories.
     */
    cursor?: ProductPriceMemoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductPriceMemories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductPriceMemories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductPriceMemories.
     */
    distinct?: ProductPriceMemoryScalarFieldEnum | ProductPriceMemoryScalarFieldEnum[]
  }

  /**
   * ProductPriceMemory findFirstOrThrow
   */
  export type ProductPriceMemoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductPriceMemory
     */
    select?: ProductPriceMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductPriceMemory
     */
    omit?: ProductPriceMemoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductPriceMemoryInclude<ExtArgs> | null
    /**
     * Filter, which ProductPriceMemory to fetch.
     */
    where?: ProductPriceMemoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductPriceMemories to fetch.
     */
    orderBy?: ProductPriceMemoryOrderByWithRelationInput | ProductPriceMemoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductPriceMemories.
     */
    cursor?: ProductPriceMemoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductPriceMemories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductPriceMemories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductPriceMemories.
     */
    distinct?: ProductPriceMemoryScalarFieldEnum | ProductPriceMemoryScalarFieldEnum[]
  }

  /**
   * ProductPriceMemory findMany
   */
  export type ProductPriceMemoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductPriceMemory
     */
    select?: ProductPriceMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductPriceMemory
     */
    omit?: ProductPriceMemoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductPriceMemoryInclude<ExtArgs> | null
    /**
     * Filter, which ProductPriceMemories to fetch.
     */
    where?: ProductPriceMemoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductPriceMemories to fetch.
     */
    orderBy?: ProductPriceMemoryOrderByWithRelationInput | ProductPriceMemoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductPriceMemories.
     */
    cursor?: ProductPriceMemoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductPriceMemories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductPriceMemories.
     */
    skip?: number
    distinct?: ProductPriceMemoryScalarFieldEnum | ProductPriceMemoryScalarFieldEnum[]
  }

  /**
   * ProductPriceMemory create
   */
  export type ProductPriceMemoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductPriceMemory
     */
    select?: ProductPriceMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductPriceMemory
     */
    omit?: ProductPriceMemoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductPriceMemoryInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductPriceMemory.
     */
    data: XOR<ProductPriceMemoryCreateInput, ProductPriceMemoryUncheckedCreateInput>
  }

  /**
   * ProductPriceMemory createMany
   */
  export type ProductPriceMemoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductPriceMemories.
     */
    data: ProductPriceMemoryCreateManyInput | ProductPriceMemoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductPriceMemory createManyAndReturn
   */
  export type ProductPriceMemoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductPriceMemory
     */
    select?: ProductPriceMemorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductPriceMemory
     */
    omit?: ProductPriceMemoryOmit<ExtArgs> | null
    /**
     * The data used to create many ProductPriceMemories.
     */
    data: ProductPriceMemoryCreateManyInput | ProductPriceMemoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductPriceMemoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductPriceMemory update
   */
  export type ProductPriceMemoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductPriceMemory
     */
    select?: ProductPriceMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductPriceMemory
     */
    omit?: ProductPriceMemoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductPriceMemoryInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductPriceMemory.
     */
    data: XOR<ProductPriceMemoryUpdateInput, ProductPriceMemoryUncheckedUpdateInput>
    /**
     * Choose, which ProductPriceMemory to update.
     */
    where: ProductPriceMemoryWhereUniqueInput
  }

  /**
   * ProductPriceMemory updateMany
   */
  export type ProductPriceMemoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductPriceMemories.
     */
    data: XOR<ProductPriceMemoryUpdateManyMutationInput, ProductPriceMemoryUncheckedUpdateManyInput>
    /**
     * Filter which ProductPriceMemories to update
     */
    where?: ProductPriceMemoryWhereInput
    /**
     * Limit how many ProductPriceMemories to update.
     */
    limit?: number
  }

  /**
   * ProductPriceMemory updateManyAndReturn
   */
  export type ProductPriceMemoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductPriceMemory
     */
    select?: ProductPriceMemorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductPriceMemory
     */
    omit?: ProductPriceMemoryOmit<ExtArgs> | null
    /**
     * The data used to update ProductPriceMemories.
     */
    data: XOR<ProductPriceMemoryUpdateManyMutationInput, ProductPriceMemoryUncheckedUpdateManyInput>
    /**
     * Filter which ProductPriceMemories to update
     */
    where?: ProductPriceMemoryWhereInput
    /**
     * Limit how many ProductPriceMemories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductPriceMemoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductPriceMemory upsert
   */
  export type ProductPriceMemoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductPriceMemory
     */
    select?: ProductPriceMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductPriceMemory
     */
    omit?: ProductPriceMemoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductPriceMemoryInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductPriceMemory to update in case it exists.
     */
    where: ProductPriceMemoryWhereUniqueInput
    /**
     * In case the ProductPriceMemory found by the `where` argument doesn't exist, create a new ProductPriceMemory with this data.
     */
    create: XOR<ProductPriceMemoryCreateInput, ProductPriceMemoryUncheckedCreateInput>
    /**
     * In case the ProductPriceMemory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductPriceMemoryUpdateInput, ProductPriceMemoryUncheckedUpdateInput>
  }

  /**
   * ProductPriceMemory delete
   */
  export type ProductPriceMemoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductPriceMemory
     */
    select?: ProductPriceMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductPriceMemory
     */
    omit?: ProductPriceMemoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductPriceMemoryInclude<ExtArgs> | null
    /**
     * Filter which ProductPriceMemory to delete.
     */
    where: ProductPriceMemoryWhereUniqueInput
  }

  /**
   * ProductPriceMemory deleteMany
   */
  export type ProductPriceMemoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductPriceMemories to delete
     */
    where?: ProductPriceMemoryWhereInput
    /**
     * Limit how many ProductPriceMemories to delete.
     */
    limit?: number
  }

  /**
   * ProductPriceMemory without action
   */
  export type ProductPriceMemoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductPriceMemory
     */
    select?: ProductPriceMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductPriceMemory
     */
    omit?: ProductPriceMemoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductPriceMemoryInclude<ExtArgs> | null
  }


  /**
   * Model InvoicePhoto
   */

  export type AggregateInvoicePhoto = {
    _count: InvoicePhotoCountAggregateOutputType | null
    _avg: InvoicePhotoAvgAggregateOutputType | null
    _sum: InvoicePhotoSumAggregateOutputType | null
    _min: InvoicePhotoMinAggregateOutputType | null
    _max: InvoicePhotoMaxAggregateOutputType | null
  }

  export type InvoicePhotoAvgAggregateOutputType = {
    id: number | null
    invoiceId: number | null
  }

  export type InvoicePhotoSumAggregateOutputType = {
    id: number | null
    invoiceId: number | null
  }

  export type InvoicePhotoMinAggregateOutputType = {
    id: number | null
    invoiceId: number | null
    url: string | null
    processed: boolean | null
    createdAt: Date | null
  }

  export type InvoicePhotoMaxAggregateOutputType = {
    id: number | null
    invoiceId: number | null
    url: string | null
    processed: boolean | null
    createdAt: Date | null
  }

  export type InvoicePhotoCountAggregateOutputType = {
    id: number
    invoiceId: number
    url: number
    processed: number
    createdAt: number
    _all: number
  }


  export type InvoicePhotoAvgAggregateInputType = {
    id?: true
    invoiceId?: true
  }

  export type InvoicePhotoSumAggregateInputType = {
    id?: true
    invoiceId?: true
  }

  export type InvoicePhotoMinAggregateInputType = {
    id?: true
    invoiceId?: true
    url?: true
    processed?: true
    createdAt?: true
  }

  export type InvoicePhotoMaxAggregateInputType = {
    id?: true
    invoiceId?: true
    url?: true
    processed?: true
    createdAt?: true
  }

  export type InvoicePhotoCountAggregateInputType = {
    id?: true
    invoiceId?: true
    url?: true
    processed?: true
    createdAt?: true
    _all?: true
  }

  export type InvoicePhotoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InvoicePhoto to aggregate.
     */
    where?: InvoicePhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvoicePhotos to fetch.
     */
    orderBy?: InvoicePhotoOrderByWithRelationInput | InvoicePhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InvoicePhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvoicePhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvoicePhotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InvoicePhotos
    **/
    _count?: true | InvoicePhotoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InvoicePhotoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InvoicePhotoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InvoicePhotoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InvoicePhotoMaxAggregateInputType
  }

  export type GetInvoicePhotoAggregateType<T extends InvoicePhotoAggregateArgs> = {
        [P in keyof T & keyof AggregateInvoicePhoto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInvoicePhoto[P]>
      : GetScalarType<T[P], AggregateInvoicePhoto[P]>
  }




  export type InvoicePhotoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InvoicePhotoWhereInput
    orderBy?: InvoicePhotoOrderByWithAggregationInput | InvoicePhotoOrderByWithAggregationInput[]
    by: InvoicePhotoScalarFieldEnum[] | InvoicePhotoScalarFieldEnum
    having?: InvoicePhotoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InvoicePhotoCountAggregateInputType | true
    _avg?: InvoicePhotoAvgAggregateInputType
    _sum?: InvoicePhotoSumAggregateInputType
    _min?: InvoicePhotoMinAggregateInputType
    _max?: InvoicePhotoMaxAggregateInputType
  }

  export type InvoicePhotoGroupByOutputType = {
    id: number
    invoiceId: number
    url: string
    processed: boolean
    createdAt: Date
    _count: InvoicePhotoCountAggregateOutputType | null
    _avg: InvoicePhotoAvgAggregateOutputType | null
    _sum: InvoicePhotoSumAggregateOutputType | null
    _min: InvoicePhotoMinAggregateOutputType | null
    _max: InvoicePhotoMaxAggregateOutputType | null
  }

  type GetInvoicePhotoGroupByPayload<T extends InvoicePhotoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InvoicePhotoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InvoicePhotoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InvoicePhotoGroupByOutputType[P]>
            : GetScalarType<T[P], InvoicePhotoGroupByOutputType[P]>
        }
      >
    >


  export type InvoicePhotoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invoiceId?: boolean
    url?: boolean
    processed?: boolean
    createdAt?: boolean
    invoice?: boolean | InvoiceDefaultArgs<ExtArgs>
    rawInvoiceItems?: boolean | InvoicePhoto$rawInvoiceItemsArgs<ExtArgs>
    _count?: boolean | InvoicePhotoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoicePhoto"]>

  export type InvoicePhotoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invoiceId?: boolean
    url?: boolean
    processed?: boolean
    createdAt?: boolean
    invoice?: boolean | InvoiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoicePhoto"]>

  export type InvoicePhotoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    invoiceId?: boolean
    url?: boolean
    processed?: boolean
    createdAt?: boolean
    invoice?: boolean | InvoiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["invoicePhoto"]>

  export type InvoicePhotoSelectScalar = {
    id?: boolean
    invoiceId?: boolean
    url?: boolean
    processed?: boolean
    createdAt?: boolean
  }

  export type InvoicePhotoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "invoiceId" | "url" | "processed" | "createdAt", ExtArgs["result"]["invoicePhoto"]>
  export type InvoicePhotoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invoice?: boolean | InvoiceDefaultArgs<ExtArgs>
    rawInvoiceItems?: boolean | InvoicePhoto$rawInvoiceItemsArgs<ExtArgs>
    _count?: boolean | InvoicePhotoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type InvoicePhotoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invoice?: boolean | InvoiceDefaultArgs<ExtArgs>
  }
  export type InvoicePhotoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    invoice?: boolean | InvoiceDefaultArgs<ExtArgs>
  }

  export type $InvoicePhotoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InvoicePhoto"
    objects: {
      invoice: Prisma.$InvoicePayload<ExtArgs>
      rawInvoiceItems: Prisma.$RawInvoiceItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      invoiceId: number
      url: string
      processed: boolean
      createdAt: Date
    }, ExtArgs["result"]["invoicePhoto"]>
    composites: {}
  }

  type InvoicePhotoGetPayload<S extends boolean | null | undefined | InvoicePhotoDefaultArgs> = $Result.GetResult<Prisma.$InvoicePhotoPayload, S>

  type InvoicePhotoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InvoicePhotoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InvoicePhotoCountAggregateInputType | true
    }

  export interface InvoicePhotoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InvoicePhoto'], meta: { name: 'InvoicePhoto' } }
    /**
     * Find zero or one InvoicePhoto that matches the filter.
     * @param {InvoicePhotoFindUniqueArgs} args - Arguments to find a InvoicePhoto
     * @example
     * // Get one InvoicePhoto
     * const invoicePhoto = await prisma.invoicePhoto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InvoicePhotoFindUniqueArgs>(args: SelectSubset<T, InvoicePhotoFindUniqueArgs<ExtArgs>>): Prisma__InvoicePhotoClient<$Result.GetResult<Prisma.$InvoicePhotoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one InvoicePhoto that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InvoicePhotoFindUniqueOrThrowArgs} args - Arguments to find a InvoicePhoto
     * @example
     * // Get one InvoicePhoto
     * const invoicePhoto = await prisma.invoicePhoto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InvoicePhotoFindUniqueOrThrowArgs>(args: SelectSubset<T, InvoicePhotoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InvoicePhotoClient<$Result.GetResult<Prisma.$InvoicePhotoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InvoicePhoto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoicePhotoFindFirstArgs} args - Arguments to find a InvoicePhoto
     * @example
     * // Get one InvoicePhoto
     * const invoicePhoto = await prisma.invoicePhoto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InvoicePhotoFindFirstArgs>(args?: SelectSubset<T, InvoicePhotoFindFirstArgs<ExtArgs>>): Prisma__InvoicePhotoClient<$Result.GetResult<Prisma.$InvoicePhotoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InvoicePhoto that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoicePhotoFindFirstOrThrowArgs} args - Arguments to find a InvoicePhoto
     * @example
     * // Get one InvoicePhoto
     * const invoicePhoto = await prisma.invoicePhoto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InvoicePhotoFindFirstOrThrowArgs>(args?: SelectSubset<T, InvoicePhotoFindFirstOrThrowArgs<ExtArgs>>): Prisma__InvoicePhotoClient<$Result.GetResult<Prisma.$InvoicePhotoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more InvoicePhotos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoicePhotoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InvoicePhotos
     * const invoicePhotos = await prisma.invoicePhoto.findMany()
     * 
     * // Get first 10 InvoicePhotos
     * const invoicePhotos = await prisma.invoicePhoto.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const invoicePhotoWithIdOnly = await prisma.invoicePhoto.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InvoicePhotoFindManyArgs>(args?: SelectSubset<T, InvoicePhotoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePhotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a InvoicePhoto.
     * @param {InvoicePhotoCreateArgs} args - Arguments to create a InvoicePhoto.
     * @example
     * // Create one InvoicePhoto
     * const InvoicePhoto = await prisma.invoicePhoto.create({
     *   data: {
     *     // ... data to create a InvoicePhoto
     *   }
     * })
     * 
     */
    create<T extends InvoicePhotoCreateArgs>(args: SelectSubset<T, InvoicePhotoCreateArgs<ExtArgs>>): Prisma__InvoicePhotoClient<$Result.GetResult<Prisma.$InvoicePhotoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many InvoicePhotos.
     * @param {InvoicePhotoCreateManyArgs} args - Arguments to create many InvoicePhotos.
     * @example
     * // Create many InvoicePhotos
     * const invoicePhoto = await prisma.invoicePhoto.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InvoicePhotoCreateManyArgs>(args?: SelectSubset<T, InvoicePhotoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InvoicePhotos and returns the data saved in the database.
     * @param {InvoicePhotoCreateManyAndReturnArgs} args - Arguments to create many InvoicePhotos.
     * @example
     * // Create many InvoicePhotos
     * const invoicePhoto = await prisma.invoicePhoto.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InvoicePhotos and only return the `id`
     * const invoicePhotoWithIdOnly = await prisma.invoicePhoto.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InvoicePhotoCreateManyAndReturnArgs>(args?: SelectSubset<T, InvoicePhotoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePhotoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a InvoicePhoto.
     * @param {InvoicePhotoDeleteArgs} args - Arguments to delete one InvoicePhoto.
     * @example
     * // Delete one InvoicePhoto
     * const InvoicePhoto = await prisma.invoicePhoto.delete({
     *   where: {
     *     // ... filter to delete one InvoicePhoto
     *   }
     * })
     * 
     */
    delete<T extends InvoicePhotoDeleteArgs>(args: SelectSubset<T, InvoicePhotoDeleteArgs<ExtArgs>>): Prisma__InvoicePhotoClient<$Result.GetResult<Prisma.$InvoicePhotoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one InvoicePhoto.
     * @param {InvoicePhotoUpdateArgs} args - Arguments to update one InvoicePhoto.
     * @example
     * // Update one InvoicePhoto
     * const invoicePhoto = await prisma.invoicePhoto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InvoicePhotoUpdateArgs>(args: SelectSubset<T, InvoicePhotoUpdateArgs<ExtArgs>>): Prisma__InvoicePhotoClient<$Result.GetResult<Prisma.$InvoicePhotoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more InvoicePhotos.
     * @param {InvoicePhotoDeleteManyArgs} args - Arguments to filter InvoicePhotos to delete.
     * @example
     * // Delete a few InvoicePhotos
     * const { count } = await prisma.invoicePhoto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InvoicePhotoDeleteManyArgs>(args?: SelectSubset<T, InvoicePhotoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InvoicePhotos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoicePhotoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InvoicePhotos
     * const invoicePhoto = await prisma.invoicePhoto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InvoicePhotoUpdateManyArgs>(args: SelectSubset<T, InvoicePhotoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InvoicePhotos and returns the data updated in the database.
     * @param {InvoicePhotoUpdateManyAndReturnArgs} args - Arguments to update many InvoicePhotos.
     * @example
     * // Update many InvoicePhotos
     * const invoicePhoto = await prisma.invoicePhoto.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more InvoicePhotos and only return the `id`
     * const invoicePhotoWithIdOnly = await prisma.invoicePhoto.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InvoicePhotoUpdateManyAndReturnArgs>(args: SelectSubset<T, InvoicePhotoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InvoicePhotoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one InvoicePhoto.
     * @param {InvoicePhotoUpsertArgs} args - Arguments to update or create a InvoicePhoto.
     * @example
     * // Update or create a InvoicePhoto
     * const invoicePhoto = await prisma.invoicePhoto.upsert({
     *   create: {
     *     // ... data to create a InvoicePhoto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InvoicePhoto we want to update
     *   }
     * })
     */
    upsert<T extends InvoicePhotoUpsertArgs>(args: SelectSubset<T, InvoicePhotoUpsertArgs<ExtArgs>>): Prisma__InvoicePhotoClient<$Result.GetResult<Prisma.$InvoicePhotoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of InvoicePhotos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoicePhotoCountArgs} args - Arguments to filter InvoicePhotos to count.
     * @example
     * // Count the number of InvoicePhotos
     * const count = await prisma.invoicePhoto.count({
     *   where: {
     *     // ... the filter for the InvoicePhotos we want to count
     *   }
     * })
    **/
    count<T extends InvoicePhotoCountArgs>(
      args?: Subset<T, InvoicePhotoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InvoicePhotoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InvoicePhoto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoicePhotoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InvoicePhotoAggregateArgs>(args: Subset<T, InvoicePhotoAggregateArgs>): Prisma.PrismaPromise<GetInvoicePhotoAggregateType<T>>

    /**
     * Group by InvoicePhoto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InvoicePhotoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InvoicePhotoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InvoicePhotoGroupByArgs['orderBy'] }
        : { orderBy?: InvoicePhotoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InvoicePhotoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvoicePhotoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InvoicePhoto model
   */
  readonly fields: InvoicePhotoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InvoicePhoto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InvoicePhotoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    invoice<T extends InvoiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InvoiceDefaultArgs<ExtArgs>>): Prisma__InvoiceClient<$Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    rawInvoiceItems<T extends InvoicePhoto$rawInvoiceItemsArgs<ExtArgs> = {}>(args?: Subset<T, InvoicePhoto$rawInvoiceItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RawInvoiceItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the InvoicePhoto model
   */
  interface InvoicePhotoFieldRefs {
    readonly id: FieldRef<"InvoicePhoto", 'Int'>
    readonly invoiceId: FieldRef<"InvoicePhoto", 'Int'>
    readonly url: FieldRef<"InvoicePhoto", 'String'>
    readonly processed: FieldRef<"InvoicePhoto", 'Boolean'>
    readonly createdAt: FieldRef<"InvoicePhoto", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * InvoicePhoto findUnique
   */
  export type InvoicePhotoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoicePhoto
     */
    select?: InvoicePhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoicePhoto
     */
    omit?: InvoicePhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoicePhotoInclude<ExtArgs> | null
    /**
     * Filter, which InvoicePhoto to fetch.
     */
    where: InvoicePhotoWhereUniqueInput
  }

  /**
   * InvoicePhoto findUniqueOrThrow
   */
  export type InvoicePhotoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoicePhoto
     */
    select?: InvoicePhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoicePhoto
     */
    omit?: InvoicePhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoicePhotoInclude<ExtArgs> | null
    /**
     * Filter, which InvoicePhoto to fetch.
     */
    where: InvoicePhotoWhereUniqueInput
  }

  /**
   * InvoicePhoto findFirst
   */
  export type InvoicePhotoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoicePhoto
     */
    select?: InvoicePhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoicePhoto
     */
    omit?: InvoicePhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoicePhotoInclude<ExtArgs> | null
    /**
     * Filter, which InvoicePhoto to fetch.
     */
    where?: InvoicePhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvoicePhotos to fetch.
     */
    orderBy?: InvoicePhotoOrderByWithRelationInput | InvoicePhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InvoicePhotos.
     */
    cursor?: InvoicePhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvoicePhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvoicePhotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InvoicePhotos.
     */
    distinct?: InvoicePhotoScalarFieldEnum | InvoicePhotoScalarFieldEnum[]
  }

  /**
   * InvoicePhoto findFirstOrThrow
   */
  export type InvoicePhotoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoicePhoto
     */
    select?: InvoicePhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoicePhoto
     */
    omit?: InvoicePhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoicePhotoInclude<ExtArgs> | null
    /**
     * Filter, which InvoicePhoto to fetch.
     */
    where?: InvoicePhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvoicePhotos to fetch.
     */
    orderBy?: InvoicePhotoOrderByWithRelationInput | InvoicePhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InvoicePhotos.
     */
    cursor?: InvoicePhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvoicePhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvoicePhotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InvoicePhotos.
     */
    distinct?: InvoicePhotoScalarFieldEnum | InvoicePhotoScalarFieldEnum[]
  }

  /**
   * InvoicePhoto findMany
   */
  export type InvoicePhotoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoicePhoto
     */
    select?: InvoicePhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoicePhoto
     */
    omit?: InvoicePhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoicePhotoInclude<ExtArgs> | null
    /**
     * Filter, which InvoicePhotos to fetch.
     */
    where?: InvoicePhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InvoicePhotos to fetch.
     */
    orderBy?: InvoicePhotoOrderByWithRelationInput | InvoicePhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InvoicePhotos.
     */
    cursor?: InvoicePhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InvoicePhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InvoicePhotos.
     */
    skip?: number
    distinct?: InvoicePhotoScalarFieldEnum | InvoicePhotoScalarFieldEnum[]
  }

  /**
   * InvoicePhoto create
   */
  export type InvoicePhotoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoicePhoto
     */
    select?: InvoicePhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoicePhoto
     */
    omit?: InvoicePhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoicePhotoInclude<ExtArgs> | null
    /**
     * The data needed to create a InvoicePhoto.
     */
    data: XOR<InvoicePhotoCreateInput, InvoicePhotoUncheckedCreateInput>
  }

  /**
   * InvoicePhoto createMany
   */
  export type InvoicePhotoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InvoicePhotos.
     */
    data: InvoicePhotoCreateManyInput | InvoicePhotoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InvoicePhoto createManyAndReturn
   */
  export type InvoicePhotoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoicePhoto
     */
    select?: InvoicePhotoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InvoicePhoto
     */
    omit?: InvoicePhotoOmit<ExtArgs> | null
    /**
     * The data used to create many InvoicePhotos.
     */
    data: InvoicePhotoCreateManyInput | InvoicePhotoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoicePhotoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * InvoicePhoto update
   */
  export type InvoicePhotoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoicePhoto
     */
    select?: InvoicePhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoicePhoto
     */
    omit?: InvoicePhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoicePhotoInclude<ExtArgs> | null
    /**
     * The data needed to update a InvoicePhoto.
     */
    data: XOR<InvoicePhotoUpdateInput, InvoicePhotoUncheckedUpdateInput>
    /**
     * Choose, which InvoicePhoto to update.
     */
    where: InvoicePhotoWhereUniqueInput
  }

  /**
   * InvoicePhoto updateMany
   */
  export type InvoicePhotoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InvoicePhotos.
     */
    data: XOR<InvoicePhotoUpdateManyMutationInput, InvoicePhotoUncheckedUpdateManyInput>
    /**
     * Filter which InvoicePhotos to update
     */
    where?: InvoicePhotoWhereInput
    /**
     * Limit how many InvoicePhotos to update.
     */
    limit?: number
  }

  /**
   * InvoicePhoto updateManyAndReturn
   */
  export type InvoicePhotoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoicePhoto
     */
    select?: InvoicePhotoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InvoicePhoto
     */
    omit?: InvoicePhotoOmit<ExtArgs> | null
    /**
     * The data used to update InvoicePhotos.
     */
    data: XOR<InvoicePhotoUpdateManyMutationInput, InvoicePhotoUncheckedUpdateManyInput>
    /**
     * Filter which InvoicePhotos to update
     */
    where?: InvoicePhotoWhereInput
    /**
     * Limit how many InvoicePhotos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoicePhotoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * InvoicePhoto upsert
   */
  export type InvoicePhotoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoicePhoto
     */
    select?: InvoicePhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoicePhoto
     */
    omit?: InvoicePhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoicePhotoInclude<ExtArgs> | null
    /**
     * The filter to search for the InvoicePhoto to update in case it exists.
     */
    where: InvoicePhotoWhereUniqueInput
    /**
     * In case the InvoicePhoto found by the `where` argument doesn't exist, create a new InvoicePhoto with this data.
     */
    create: XOR<InvoicePhotoCreateInput, InvoicePhotoUncheckedCreateInput>
    /**
     * In case the InvoicePhoto was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InvoicePhotoUpdateInput, InvoicePhotoUncheckedUpdateInput>
  }

  /**
   * InvoicePhoto delete
   */
  export type InvoicePhotoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoicePhoto
     */
    select?: InvoicePhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoicePhoto
     */
    omit?: InvoicePhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoicePhotoInclude<ExtArgs> | null
    /**
     * Filter which InvoicePhoto to delete.
     */
    where: InvoicePhotoWhereUniqueInput
  }

  /**
   * InvoicePhoto deleteMany
   */
  export type InvoicePhotoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InvoicePhotos to delete
     */
    where?: InvoicePhotoWhereInput
    /**
     * Limit how many InvoicePhotos to delete.
     */
    limit?: number
  }

  /**
   * InvoicePhoto.rawInvoiceItems
   */
  export type InvoicePhoto$rawInvoiceItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawInvoiceItem
     */
    select?: RawInvoiceItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RawInvoiceItem
     */
    omit?: RawInvoiceItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RawInvoiceItemInclude<ExtArgs> | null
    where?: RawInvoiceItemWhereInput
    orderBy?: RawInvoiceItemOrderByWithRelationInput | RawInvoiceItemOrderByWithRelationInput[]
    cursor?: RawInvoiceItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RawInvoiceItemScalarFieldEnum | RawInvoiceItemScalarFieldEnum[]
  }

  /**
   * InvoicePhoto without action
   */
  export type InvoicePhotoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InvoicePhoto
     */
    select?: InvoicePhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InvoicePhoto
     */
    omit?: InvoicePhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InvoicePhotoInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AgentScalarFieldEnum: {
    id: 'id',
    name: 'name',
    markupPercent: 'markupPercent',
    format: 'format',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AgentScalarFieldEnum = (typeof AgentScalarFieldEnum)[keyof typeof AgentScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    name: 'name',
    category: 'category',
    agentId: 'agentId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const InvoiceScalarFieldEnum: {
    id: 'id',
    agentId: 'agentId',
    type: 'type',
    invoiceDate: 'invoiceDate',
    markupPercent: 'markupPercent',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type InvoiceScalarFieldEnum = (typeof InvoiceScalarFieldEnum)[keyof typeof InvoiceScalarFieldEnum]


  export const InvoiceItemScalarFieldEnum: {
    id: 'id',
    invoiceId: 'invoiceId',
    productId: 'productId',
    productName: 'productName',
    unitType: 'unitType',
    boxSize: 'boxSize',
    quantity: 'quantity',
    boxesCount: 'boxesCount',
    purchasePrice: 'purchasePrice',
    purchasePricePerUnit: 'purchasePricePerUnit',
    calculatedPrice: 'calculatedPrice',
    roundedPrice: 'roundedPrice',
    priceChanged: 'priceChanged',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type InvoiceItemScalarFieldEnum = (typeof InvoiceItemScalarFieldEnum)[keyof typeof InvoiceItemScalarFieldEnum]


  export const RawInvoiceItemScalarFieldEnum: {
    id: 'id',
    invoicePhotoId: 'invoicePhotoId',
    rowIndex: 'rowIndex',
    description: 'description',
    rawQuantity: 'rawQuantity',
    rawUnitPrice: 'rawUnitPrice',
    rawAmount: 'rawAmount',
    createdAt: 'createdAt'
  };

  export type RawInvoiceItemScalarFieldEnum = (typeof RawInvoiceItemScalarFieldEnum)[keyof typeof RawInvoiceItemScalarFieldEnum]


  export const ProductPriceMemoryScalarFieldEnum: {
    id: 'id',
    productId: 'productId',
    agentId: 'agentId',
    purchasePrice: 'purchasePrice',
    salePrice: 'salePrice',
    source: 'source',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductPriceMemoryScalarFieldEnum = (typeof ProductPriceMemoryScalarFieldEnum)[keyof typeof ProductPriceMemoryScalarFieldEnum]


  export const InvoicePhotoScalarFieldEnum: {
    id: 'id',
    invoiceId: 'invoiceId',
    url: 'url',
    processed: 'processed',
    createdAt: 'createdAt'
  };

  export type InvoicePhotoScalarFieldEnum = (typeof InvoicePhotoScalarFieldEnum)[keyof typeof InvoicePhotoScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'AgentInvoiceFormat'
   */
  export type EnumAgentInvoiceFormatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AgentInvoiceFormat'>
    


  /**
   * Reference to a field of type 'AgentInvoiceFormat[]'
   */
  export type ListEnumAgentInvoiceFormatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AgentInvoiceFormat[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'InvoiceType'
   */
  export type EnumInvoiceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InvoiceType'>
    


  /**
   * Reference to a field of type 'InvoiceType[]'
   */
  export type ListEnumInvoiceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InvoiceType[]'>
    


  /**
   * Reference to a field of type 'UnitType'
   */
  export type EnumUnitTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UnitType'>
    


  /**
   * Reference to a field of type 'UnitType[]'
   */
  export type ListEnumUnitTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UnitType[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'PriceSource'
   */
  export type EnumPriceSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PriceSource'>
    


  /**
   * Reference to a field of type 'PriceSource[]'
   */
  export type ListEnumPriceSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PriceSource[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type AgentWhereInput = {
    AND?: AgentWhereInput | AgentWhereInput[]
    OR?: AgentWhereInput[]
    NOT?: AgentWhereInput | AgentWhereInput[]
    id?: IntFilter<"Agent"> | number
    name?: StringFilter<"Agent"> | string
    markupPercent?: IntFilter<"Agent"> | number
    format?: EnumAgentInvoiceFormatNullableFilter<"Agent"> | $Enums.AgentInvoiceFormat | null
    createdAt?: DateTimeFilter<"Agent"> | Date | string
    updatedAt?: DateTimeFilter<"Agent"> | Date | string
    invoices?: InvoiceListRelationFilter
    products?: ProductListRelationFilter
    priceMemory?: ProductPriceMemoryListRelationFilter
  }

  export type AgentOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    markupPercent?: SortOrder
    format?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    invoices?: InvoiceOrderByRelationAggregateInput
    products?: ProductOrderByRelationAggregateInput
    priceMemory?: ProductPriceMemoryOrderByRelationAggregateInput
  }

  export type AgentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: AgentWhereInput | AgentWhereInput[]
    OR?: AgentWhereInput[]
    NOT?: AgentWhereInput | AgentWhereInput[]
    markupPercent?: IntFilter<"Agent"> | number
    format?: EnumAgentInvoiceFormatNullableFilter<"Agent"> | $Enums.AgentInvoiceFormat | null
    createdAt?: DateTimeFilter<"Agent"> | Date | string
    updatedAt?: DateTimeFilter<"Agent"> | Date | string
    invoices?: InvoiceListRelationFilter
    products?: ProductListRelationFilter
    priceMemory?: ProductPriceMemoryListRelationFilter
  }, "id" | "name">

  export type AgentOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    markupPercent?: SortOrder
    format?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AgentCountOrderByAggregateInput
    _avg?: AgentAvgOrderByAggregateInput
    _max?: AgentMaxOrderByAggregateInput
    _min?: AgentMinOrderByAggregateInput
    _sum?: AgentSumOrderByAggregateInput
  }

  export type AgentScalarWhereWithAggregatesInput = {
    AND?: AgentScalarWhereWithAggregatesInput | AgentScalarWhereWithAggregatesInput[]
    OR?: AgentScalarWhereWithAggregatesInput[]
    NOT?: AgentScalarWhereWithAggregatesInput | AgentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Agent"> | number
    name?: StringWithAggregatesFilter<"Agent"> | string
    markupPercent?: IntWithAggregatesFilter<"Agent"> | number
    format?: EnumAgentInvoiceFormatNullableWithAggregatesFilter<"Agent"> | $Enums.AgentInvoiceFormat | null
    createdAt?: DateTimeWithAggregatesFilter<"Agent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Agent"> | Date | string
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: IntFilter<"Product"> | number
    name?: StringFilter<"Product"> | string
    category?: StringNullableFilter<"Product"> | string | null
    agentId?: IntNullableFilter<"Product"> | number | null
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    agent?: XOR<AgentNullableScalarRelationFilter, AgentWhereInput> | null
    invoiceItems?: InvoiceItemListRelationFilter
    priceMemory?: ProductPriceMemoryListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrderInput | SortOrder
    agentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    agent?: AgentOrderByWithRelationInput
    invoiceItems?: InvoiceItemOrderByRelationAggregateInput
    priceMemory?: ProductPriceMemoryOrderByRelationAggregateInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    name?: StringFilter<"Product"> | string
    category?: StringNullableFilter<"Product"> | string | null
    agentId?: IntNullableFilter<"Product"> | number | null
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    agent?: XOR<AgentNullableScalarRelationFilter, AgentWhereInput> | null
    invoiceItems?: InvoiceItemListRelationFilter
    priceMemory?: ProductPriceMemoryListRelationFilter
  }, "id">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrderInput | SortOrder
    agentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Product"> | number
    name?: StringWithAggregatesFilter<"Product"> | string
    category?: StringNullableWithAggregatesFilter<"Product"> | string | null
    agentId?: IntNullableWithAggregatesFilter<"Product"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
  }

  export type InvoiceWhereInput = {
    AND?: InvoiceWhereInput | InvoiceWhereInput[]
    OR?: InvoiceWhereInput[]
    NOT?: InvoiceWhereInput | InvoiceWhereInput[]
    id?: IntFilter<"Invoice"> | number
    agentId?: IntFilter<"Invoice"> | number
    type?: EnumInvoiceTypeFilter<"Invoice"> | $Enums.InvoiceType
    invoiceDate?: DateTimeFilter<"Invoice"> | Date | string
    markupPercent?: IntFilter<"Invoice"> | number
    createdAt?: DateTimeFilter<"Invoice"> | Date | string
    updatedAt?: DateTimeFilter<"Invoice"> | Date | string
    agent?: XOR<AgentScalarRelationFilter, AgentWhereInput>
    items?: InvoiceItemListRelationFilter
    photos?: InvoicePhotoListRelationFilter
  }

  export type InvoiceOrderByWithRelationInput = {
    id?: SortOrder
    agentId?: SortOrder
    type?: SortOrder
    invoiceDate?: SortOrder
    markupPercent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    agent?: AgentOrderByWithRelationInput
    items?: InvoiceItemOrderByRelationAggregateInput
    photos?: InvoicePhotoOrderByRelationAggregateInput
  }

  export type InvoiceWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: InvoiceWhereInput | InvoiceWhereInput[]
    OR?: InvoiceWhereInput[]
    NOT?: InvoiceWhereInput | InvoiceWhereInput[]
    agentId?: IntFilter<"Invoice"> | number
    type?: EnumInvoiceTypeFilter<"Invoice"> | $Enums.InvoiceType
    invoiceDate?: DateTimeFilter<"Invoice"> | Date | string
    markupPercent?: IntFilter<"Invoice"> | number
    createdAt?: DateTimeFilter<"Invoice"> | Date | string
    updatedAt?: DateTimeFilter<"Invoice"> | Date | string
    agent?: XOR<AgentScalarRelationFilter, AgentWhereInput>
    items?: InvoiceItemListRelationFilter
    photos?: InvoicePhotoListRelationFilter
  }, "id">

  export type InvoiceOrderByWithAggregationInput = {
    id?: SortOrder
    agentId?: SortOrder
    type?: SortOrder
    invoiceDate?: SortOrder
    markupPercent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: InvoiceCountOrderByAggregateInput
    _avg?: InvoiceAvgOrderByAggregateInput
    _max?: InvoiceMaxOrderByAggregateInput
    _min?: InvoiceMinOrderByAggregateInput
    _sum?: InvoiceSumOrderByAggregateInput
  }

  export type InvoiceScalarWhereWithAggregatesInput = {
    AND?: InvoiceScalarWhereWithAggregatesInput | InvoiceScalarWhereWithAggregatesInput[]
    OR?: InvoiceScalarWhereWithAggregatesInput[]
    NOT?: InvoiceScalarWhereWithAggregatesInput | InvoiceScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Invoice"> | number
    agentId?: IntWithAggregatesFilter<"Invoice"> | number
    type?: EnumInvoiceTypeWithAggregatesFilter<"Invoice"> | $Enums.InvoiceType
    invoiceDate?: DateTimeWithAggregatesFilter<"Invoice"> | Date | string
    markupPercent?: IntWithAggregatesFilter<"Invoice"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Invoice"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Invoice"> | Date | string
  }

  export type InvoiceItemWhereInput = {
    AND?: InvoiceItemWhereInput | InvoiceItemWhereInput[]
    OR?: InvoiceItemWhereInput[]
    NOT?: InvoiceItemWhereInput | InvoiceItemWhereInput[]
    id?: IntFilter<"InvoiceItem"> | number
    invoiceId?: IntFilter<"InvoiceItem"> | number
    productId?: IntNullableFilter<"InvoiceItem"> | number | null
    productName?: StringFilter<"InvoiceItem"> | string
    unitType?: EnumUnitTypeFilter<"InvoiceItem"> | $Enums.UnitType
    boxSize?: IntNullableFilter<"InvoiceItem"> | number | null
    quantity?: IntFilter<"InvoiceItem"> | number
    boxesCount?: IntNullableFilter<"InvoiceItem"> | number | null
    purchasePrice?: BigIntFilter<"InvoiceItem"> | bigint | number
    purchasePricePerUnit?: BigIntNullableFilter<"InvoiceItem"> | bigint | number | null
    calculatedPrice?: BigIntFilter<"InvoiceItem"> | bigint | number
    roundedPrice?: BigIntFilter<"InvoiceItem"> | bigint | number
    priceChanged?: BoolFilter<"InvoiceItem"> | boolean
    createdAt?: DateTimeFilter<"InvoiceItem"> | Date | string
    updatedAt?: DateTimeFilter<"InvoiceItem"> | Date | string
    invoice?: XOR<InvoiceScalarRelationFilter, InvoiceWhereInput>
    product?: XOR<ProductNullableScalarRelationFilter, ProductWhereInput> | null
  }

  export type InvoiceItemOrderByWithRelationInput = {
    id?: SortOrder
    invoiceId?: SortOrder
    productId?: SortOrderInput | SortOrder
    productName?: SortOrder
    unitType?: SortOrder
    boxSize?: SortOrderInput | SortOrder
    quantity?: SortOrder
    boxesCount?: SortOrderInput | SortOrder
    purchasePrice?: SortOrder
    purchasePricePerUnit?: SortOrderInput | SortOrder
    calculatedPrice?: SortOrder
    roundedPrice?: SortOrder
    priceChanged?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    invoice?: InvoiceOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
  }

  export type InvoiceItemWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: InvoiceItemWhereInput | InvoiceItemWhereInput[]
    OR?: InvoiceItemWhereInput[]
    NOT?: InvoiceItemWhereInput | InvoiceItemWhereInput[]
    invoiceId?: IntFilter<"InvoiceItem"> | number
    productId?: IntNullableFilter<"InvoiceItem"> | number | null
    productName?: StringFilter<"InvoiceItem"> | string
    unitType?: EnumUnitTypeFilter<"InvoiceItem"> | $Enums.UnitType
    boxSize?: IntNullableFilter<"InvoiceItem"> | number | null
    quantity?: IntFilter<"InvoiceItem"> | number
    boxesCount?: IntNullableFilter<"InvoiceItem"> | number | null
    purchasePrice?: BigIntFilter<"InvoiceItem"> | bigint | number
    purchasePricePerUnit?: BigIntNullableFilter<"InvoiceItem"> | bigint | number | null
    calculatedPrice?: BigIntFilter<"InvoiceItem"> | bigint | number
    roundedPrice?: BigIntFilter<"InvoiceItem"> | bigint | number
    priceChanged?: BoolFilter<"InvoiceItem"> | boolean
    createdAt?: DateTimeFilter<"InvoiceItem"> | Date | string
    updatedAt?: DateTimeFilter<"InvoiceItem"> | Date | string
    invoice?: XOR<InvoiceScalarRelationFilter, InvoiceWhereInput>
    product?: XOR<ProductNullableScalarRelationFilter, ProductWhereInput> | null
  }, "id">

  export type InvoiceItemOrderByWithAggregationInput = {
    id?: SortOrder
    invoiceId?: SortOrder
    productId?: SortOrderInput | SortOrder
    productName?: SortOrder
    unitType?: SortOrder
    boxSize?: SortOrderInput | SortOrder
    quantity?: SortOrder
    boxesCount?: SortOrderInput | SortOrder
    purchasePrice?: SortOrder
    purchasePricePerUnit?: SortOrderInput | SortOrder
    calculatedPrice?: SortOrder
    roundedPrice?: SortOrder
    priceChanged?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: InvoiceItemCountOrderByAggregateInput
    _avg?: InvoiceItemAvgOrderByAggregateInput
    _max?: InvoiceItemMaxOrderByAggregateInput
    _min?: InvoiceItemMinOrderByAggregateInput
    _sum?: InvoiceItemSumOrderByAggregateInput
  }

  export type InvoiceItemScalarWhereWithAggregatesInput = {
    AND?: InvoiceItemScalarWhereWithAggregatesInput | InvoiceItemScalarWhereWithAggregatesInput[]
    OR?: InvoiceItemScalarWhereWithAggregatesInput[]
    NOT?: InvoiceItemScalarWhereWithAggregatesInput | InvoiceItemScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"InvoiceItem"> | number
    invoiceId?: IntWithAggregatesFilter<"InvoiceItem"> | number
    productId?: IntNullableWithAggregatesFilter<"InvoiceItem"> | number | null
    productName?: StringWithAggregatesFilter<"InvoiceItem"> | string
    unitType?: EnumUnitTypeWithAggregatesFilter<"InvoiceItem"> | $Enums.UnitType
    boxSize?: IntNullableWithAggregatesFilter<"InvoiceItem"> | number | null
    quantity?: IntWithAggregatesFilter<"InvoiceItem"> | number
    boxesCount?: IntNullableWithAggregatesFilter<"InvoiceItem"> | number | null
    purchasePrice?: BigIntWithAggregatesFilter<"InvoiceItem"> | bigint | number
    purchasePricePerUnit?: BigIntNullableWithAggregatesFilter<"InvoiceItem"> | bigint | number | null
    calculatedPrice?: BigIntWithAggregatesFilter<"InvoiceItem"> | bigint | number
    roundedPrice?: BigIntWithAggregatesFilter<"InvoiceItem"> | bigint | number
    priceChanged?: BoolWithAggregatesFilter<"InvoiceItem"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"InvoiceItem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"InvoiceItem"> | Date | string
  }

  export type RawInvoiceItemWhereInput = {
    AND?: RawInvoiceItemWhereInput | RawInvoiceItemWhereInput[]
    OR?: RawInvoiceItemWhereInput[]
    NOT?: RawInvoiceItemWhereInput | RawInvoiceItemWhereInput[]
    id?: IntFilter<"RawInvoiceItem"> | number
    invoicePhotoId?: IntFilter<"RawInvoiceItem"> | number
    rowIndex?: IntFilter<"RawInvoiceItem"> | number
    description?: StringFilter<"RawInvoiceItem"> | string
    rawQuantity?: StringNullableFilter<"RawInvoiceItem"> | string | null
    rawUnitPrice?: StringNullableFilter<"RawInvoiceItem"> | string | null
    rawAmount?: StringNullableFilter<"RawInvoiceItem"> | string | null
    createdAt?: DateTimeFilter<"RawInvoiceItem"> | Date | string
    invoicePhoto?: XOR<InvoicePhotoScalarRelationFilter, InvoicePhotoWhereInput>
  }

  export type RawInvoiceItemOrderByWithRelationInput = {
    id?: SortOrder
    invoicePhotoId?: SortOrder
    rowIndex?: SortOrder
    description?: SortOrder
    rawQuantity?: SortOrderInput | SortOrder
    rawUnitPrice?: SortOrderInput | SortOrder
    rawAmount?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    invoicePhoto?: InvoicePhotoOrderByWithRelationInput
  }

  export type RawInvoiceItemWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RawInvoiceItemWhereInput | RawInvoiceItemWhereInput[]
    OR?: RawInvoiceItemWhereInput[]
    NOT?: RawInvoiceItemWhereInput | RawInvoiceItemWhereInput[]
    invoicePhotoId?: IntFilter<"RawInvoiceItem"> | number
    rowIndex?: IntFilter<"RawInvoiceItem"> | number
    description?: StringFilter<"RawInvoiceItem"> | string
    rawQuantity?: StringNullableFilter<"RawInvoiceItem"> | string | null
    rawUnitPrice?: StringNullableFilter<"RawInvoiceItem"> | string | null
    rawAmount?: StringNullableFilter<"RawInvoiceItem"> | string | null
    createdAt?: DateTimeFilter<"RawInvoiceItem"> | Date | string
    invoicePhoto?: XOR<InvoicePhotoScalarRelationFilter, InvoicePhotoWhereInput>
  }, "id">

  export type RawInvoiceItemOrderByWithAggregationInput = {
    id?: SortOrder
    invoicePhotoId?: SortOrder
    rowIndex?: SortOrder
    description?: SortOrder
    rawQuantity?: SortOrderInput | SortOrder
    rawUnitPrice?: SortOrderInput | SortOrder
    rawAmount?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: RawInvoiceItemCountOrderByAggregateInput
    _avg?: RawInvoiceItemAvgOrderByAggregateInput
    _max?: RawInvoiceItemMaxOrderByAggregateInput
    _min?: RawInvoiceItemMinOrderByAggregateInput
    _sum?: RawInvoiceItemSumOrderByAggregateInput
  }

  export type RawInvoiceItemScalarWhereWithAggregatesInput = {
    AND?: RawInvoiceItemScalarWhereWithAggregatesInput | RawInvoiceItemScalarWhereWithAggregatesInput[]
    OR?: RawInvoiceItemScalarWhereWithAggregatesInput[]
    NOT?: RawInvoiceItemScalarWhereWithAggregatesInput | RawInvoiceItemScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RawInvoiceItem"> | number
    invoicePhotoId?: IntWithAggregatesFilter<"RawInvoiceItem"> | number
    rowIndex?: IntWithAggregatesFilter<"RawInvoiceItem"> | number
    description?: StringWithAggregatesFilter<"RawInvoiceItem"> | string
    rawQuantity?: StringNullableWithAggregatesFilter<"RawInvoiceItem"> | string | null
    rawUnitPrice?: StringNullableWithAggregatesFilter<"RawInvoiceItem"> | string | null
    rawAmount?: StringNullableWithAggregatesFilter<"RawInvoiceItem"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RawInvoiceItem"> | Date | string
  }

  export type ProductPriceMemoryWhereInput = {
    AND?: ProductPriceMemoryWhereInput | ProductPriceMemoryWhereInput[]
    OR?: ProductPriceMemoryWhereInput[]
    NOT?: ProductPriceMemoryWhereInput | ProductPriceMemoryWhereInput[]
    id?: IntFilter<"ProductPriceMemory"> | number
    productId?: IntFilter<"ProductPriceMemory"> | number
    agentId?: IntFilter<"ProductPriceMemory"> | number
    purchasePrice?: BigIntFilter<"ProductPriceMemory"> | bigint | number
    salePrice?: BigIntFilter<"ProductPriceMemory"> | bigint | number
    source?: EnumPriceSourceFilter<"ProductPriceMemory"> | $Enums.PriceSource
    createdAt?: DateTimeFilter<"ProductPriceMemory"> | Date | string
    updatedAt?: DateTimeFilter<"ProductPriceMemory"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    agent?: XOR<AgentScalarRelationFilter, AgentWhereInput>
  }

  export type ProductPriceMemoryOrderByWithRelationInput = {
    id?: SortOrder
    productId?: SortOrder
    agentId?: SortOrder
    purchasePrice?: SortOrder
    salePrice?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    product?: ProductOrderByWithRelationInput
    agent?: AgentOrderByWithRelationInput
  }

  export type ProductPriceMemoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    productId_agentId_purchasePrice?: ProductPriceMemoryProductIdAgentIdPurchasePriceCompoundUniqueInput
    AND?: ProductPriceMemoryWhereInput | ProductPriceMemoryWhereInput[]
    OR?: ProductPriceMemoryWhereInput[]
    NOT?: ProductPriceMemoryWhereInput | ProductPriceMemoryWhereInput[]
    productId?: IntFilter<"ProductPriceMemory"> | number
    agentId?: IntFilter<"ProductPriceMemory"> | number
    purchasePrice?: BigIntFilter<"ProductPriceMemory"> | bigint | number
    salePrice?: BigIntFilter<"ProductPriceMemory"> | bigint | number
    source?: EnumPriceSourceFilter<"ProductPriceMemory"> | $Enums.PriceSource
    createdAt?: DateTimeFilter<"ProductPriceMemory"> | Date | string
    updatedAt?: DateTimeFilter<"ProductPriceMemory"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    agent?: XOR<AgentScalarRelationFilter, AgentWhereInput>
  }, "id" | "productId_agentId_purchasePrice">

  export type ProductPriceMemoryOrderByWithAggregationInput = {
    id?: SortOrder
    productId?: SortOrder
    agentId?: SortOrder
    purchasePrice?: SortOrder
    salePrice?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductPriceMemoryCountOrderByAggregateInput
    _avg?: ProductPriceMemoryAvgOrderByAggregateInput
    _max?: ProductPriceMemoryMaxOrderByAggregateInput
    _min?: ProductPriceMemoryMinOrderByAggregateInput
    _sum?: ProductPriceMemorySumOrderByAggregateInput
  }

  export type ProductPriceMemoryScalarWhereWithAggregatesInput = {
    AND?: ProductPriceMemoryScalarWhereWithAggregatesInput | ProductPriceMemoryScalarWhereWithAggregatesInput[]
    OR?: ProductPriceMemoryScalarWhereWithAggregatesInput[]
    NOT?: ProductPriceMemoryScalarWhereWithAggregatesInput | ProductPriceMemoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProductPriceMemory"> | number
    productId?: IntWithAggregatesFilter<"ProductPriceMemory"> | number
    agentId?: IntWithAggregatesFilter<"ProductPriceMemory"> | number
    purchasePrice?: BigIntWithAggregatesFilter<"ProductPriceMemory"> | bigint | number
    salePrice?: BigIntWithAggregatesFilter<"ProductPriceMemory"> | bigint | number
    source?: EnumPriceSourceWithAggregatesFilter<"ProductPriceMemory"> | $Enums.PriceSource
    createdAt?: DateTimeWithAggregatesFilter<"ProductPriceMemory"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProductPriceMemory"> | Date | string
  }

  export type InvoicePhotoWhereInput = {
    AND?: InvoicePhotoWhereInput | InvoicePhotoWhereInput[]
    OR?: InvoicePhotoWhereInput[]
    NOT?: InvoicePhotoWhereInput | InvoicePhotoWhereInput[]
    id?: IntFilter<"InvoicePhoto"> | number
    invoiceId?: IntFilter<"InvoicePhoto"> | number
    url?: StringFilter<"InvoicePhoto"> | string
    processed?: BoolFilter<"InvoicePhoto"> | boolean
    createdAt?: DateTimeFilter<"InvoicePhoto"> | Date | string
    invoice?: XOR<InvoiceScalarRelationFilter, InvoiceWhereInput>
    rawInvoiceItems?: RawInvoiceItemListRelationFilter
  }

  export type InvoicePhotoOrderByWithRelationInput = {
    id?: SortOrder
    invoiceId?: SortOrder
    url?: SortOrder
    processed?: SortOrder
    createdAt?: SortOrder
    invoice?: InvoiceOrderByWithRelationInput
    rawInvoiceItems?: RawInvoiceItemOrderByRelationAggregateInput
  }

  export type InvoicePhotoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: InvoicePhotoWhereInput | InvoicePhotoWhereInput[]
    OR?: InvoicePhotoWhereInput[]
    NOT?: InvoicePhotoWhereInput | InvoicePhotoWhereInput[]
    invoiceId?: IntFilter<"InvoicePhoto"> | number
    url?: StringFilter<"InvoicePhoto"> | string
    processed?: BoolFilter<"InvoicePhoto"> | boolean
    createdAt?: DateTimeFilter<"InvoicePhoto"> | Date | string
    invoice?: XOR<InvoiceScalarRelationFilter, InvoiceWhereInput>
    rawInvoiceItems?: RawInvoiceItemListRelationFilter
  }, "id">

  export type InvoicePhotoOrderByWithAggregationInput = {
    id?: SortOrder
    invoiceId?: SortOrder
    url?: SortOrder
    processed?: SortOrder
    createdAt?: SortOrder
    _count?: InvoicePhotoCountOrderByAggregateInput
    _avg?: InvoicePhotoAvgOrderByAggregateInput
    _max?: InvoicePhotoMaxOrderByAggregateInput
    _min?: InvoicePhotoMinOrderByAggregateInput
    _sum?: InvoicePhotoSumOrderByAggregateInput
  }

  export type InvoicePhotoScalarWhereWithAggregatesInput = {
    AND?: InvoicePhotoScalarWhereWithAggregatesInput | InvoicePhotoScalarWhereWithAggregatesInput[]
    OR?: InvoicePhotoScalarWhereWithAggregatesInput[]
    NOT?: InvoicePhotoScalarWhereWithAggregatesInput | InvoicePhotoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"InvoicePhoto"> | number
    invoiceId?: IntWithAggregatesFilter<"InvoicePhoto"> | number
    url?: StringWithAggregatesFilter<"InvoicePhoto"> | string
    processed?: BoolWithAggregatesFilter<"InvoicePhoto"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"InvoicePhoto"> | Date | string
  }

  export type AgentCreateInput = {
    name: string
    markupPercent: number
    format?: $Enums.AgentInvoiceFormat | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invoices?: InvoiceCreateNestedManyWithoutAgentInput
    products?: ProductCreateNestedManyWithoutAgentInput
    priceMemory?: ProductPriceMemoryCreateNestedManyWithoutAgentInput
  }

  export type AgentUncheckedCreateInput = {
    id?: number
    name: string
    markupPercent: number
    format?: $Enums.AgentInvoiceFormat | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invoices?: InvoiceUncheckedCreateNestedManyWithoutAgentInput
    products?: ProductUncheckedCreateNestedManyWithoutAgentInput
    priceMemory?: ProductPriceMemoryUncheckedCreateNestedManyWithoutAgentInput
  }

  export type AgentUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    markupPercent?: IntFieldUpdateOperationsInput | number
    format?: NullableEnumAgentInvoiceFormatFieldUpdateOperationsInput | $Enums.AgentInvoiceFormat | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoices?: InvoiceUpdateManyWithoutAgentNestedInput
    products?: ProductUpdateManyWithoutAgentNestedInput
    priceMemory?: ProductPriceMemoryUpdateManyWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    markupPercent?: IntFieldUpdateOperationsInput | number
    format?: NullableEnumAgentInvoiceFormatFieldUpdateOperationsInput | $Enums.AgentInvoiceFormat | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoices?: InvoiceUncheckedUpdateManyWithoutAgentNestedInput
    products?: ProductUncheckedUpdateManyWithoutAgentNestedInput
    priceMemory?: ProductPriceMemoryUncheckedUpdateManyWithoutAgentNestedInput
  }

  export type AgentCreateManyInput = {
    id?: number
    name: string
    markupPercent: number
    format?: $Enums.AgentInvoiceFormat | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AgentUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    markupPercent?: IntFieldUpdateOperationsInput | number
    format?: NullableEnumAgentInvoiceFormatFieldUpdateOperationsInput | $Enums.AgentInvoiceFormat | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    markupPercent?: IntFieldUpdateOperationsInput | number
    format?: NullableEnumAgentInvoiceFormatFieldUpdateOperationsInput | $Enums.AgentInvoiceFormat | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateInput = {
    name: string
    category?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    agent?: AgentCreateNestedOneWithoutProductsInput
    invoiceItems?: InvoiceItemCreateNestedManyWithoutProductInput
    priceMemory?: ProductPriceMemoryCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    id?: number
    name: string
    category?: string | null
    agentId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invoiceItems?: InvoiceItemUncheckedCreateNestedManyWithoutProductInput
    priceMemory?: ProductPriceMemoryUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: AgentUpdateOneWithoutProductsNestedInput
    invoiceItems?: InvoiceItemUpdateManyWithoutProductNestedInput
    priceMemory?: ProductPriceMemoryUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    agentId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoiceItems?: InvoiceItemUncheckedUpdateManyWithoutProductNestedInput
    priceMemory?: ProductPriceMemoryUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: number
    name: string
    category?: string | null
    agentId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    agentId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceCreateInput = {
    type: $Enums.InvoiceType
    invoiceDate: Date | string
    markupPercent: number
    createdAt?: Date | string
    updatedAt?: Date | string
    agent: AgentCreateNestedOneWithoutInvoicesInput
    items?: InvoiceItemCreateNestedManyWithoutInvoiceInput
    photos?: InvoicePhotoCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceUncheckedCreateInput = {
    id?: number
    agentId: number
    type: $Enums.InvoiceType
    invoiceDate: Date | string
    markupPercent: number
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: InvoiceItemUncheckedCreateNestedManyWithoutInvoiceInput
    photos?: InvoicePhotoUncheckedCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceUpdateInput = {
    type?: EnumInvoiceTypeFieldUpdateOperationsInput | $Enums.InvoiceType
    invoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    markupPercent?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: AgentUpdateOneRequiredWithoutInvoicesNestedInput
    items?: InvoiceItemUpdateManyWithoutInvoiceNestedInput
    photos?: InvoicePhotoUpdateManyWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    agentId?: IntFieldUpdateOperationsInput | number
    type?: EnumInvoiceTypeFieldUpdateOperationsInput | $Enums.InvoiceType
    invoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    markupPercent?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: InvoiceItemUncheckedUpdateManyWithoutInvoiceNestedInput
    photos?: InvoicePhotoUncheckedUpdateManyWithoutInvoiceNestedInput
  }

  export type InvoiceCreateManyInput = {
    id?: number
    agentId: number
    type: $Enums.InvoiceType
    invoiceDate: Date | string
    markupPercent: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvoiceUpdateManyMutationInput = {
    type?: EnumInvoiceTypeFieldUpdateOperationsInput | $Enums.InvoiceType
    invoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    markupPercent?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    agentId?: IntFieldUpdateOperationsInput | number
    type?: EnumInvoiceTypeFieldUpdateOperationsInput | $Enums.InvoiceType
    invoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    markupPercent?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceItemCreateInput = {
    productName: string
    unitType: $Enums.UnitType
    boxSize?: number | null
    quantity: number
    boxesCount?: number | null
    purchasePrice: bigint | number
    purchasePricePerUnit?: bigint | number | null
    calculatedPrice: bigint | number
    roundedPrice: bigint | number
    priceChanged?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    invoice: InvoiceCreateNestedOneWithoutItemsInput
    product?: ProductCreateNestedOneWithoutInvoiceItemsInput
  }

  export type InvoiceItemUncheckedCreateInput = {
    id?: number
    invoiceId: number
    productId?: number | null
    productName: string
    unitType: $Enums.UnitType
    boxSize?: number | null
    quantity: number
    boxesCount?: number | null
    purchasePrice: bigint | number
    purchasePricePerUnit?: bigint | number | null
    calculatedPrice: bigint | number
    roundedPrice: bigint | number
    priceChanged?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvoiceItemUpdateInput = {
    productName?: StringFieldUpdateOperationsInput | string
    unitType?: EnumUnitTypeFieldUpdateOperationsInput | $Enums.UnitType
    boxSize?: NullableIntFieldUpdateOperationsInput | number | null
    quantity?: IntFieldUpdateOperationsInput | number
    boxesCount?: NullableIntFieldUpdateOperationsInput | number | null
    purchasePrice?: BigIntFieldUpdateOperationsInput | bigint | number
    purchasePricePerUnit?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    calculatedPrice?: BigIntFieldUpdateOperationsInput | bigint | number
    roundedPrice?: BigIntFieldUpdateOperationsInput | bigint | number
    priceChanged?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoice?: InvoiceUpdateOneRequiredWithoutItemsNestedInput
    product?: ProductUpdateOneWithoutInvoiceItemsNestedInput
  }

  export type InvoiceItemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    invoiceId?: IntFieldUpdateOperationsInput | number
    productId?: NullableIntFieldUpdateOperationsInput | number | null
    productName?: StringFieldUpdateOperationsInput | string
    unitType?: EnumUnitTypeFieldUpdateOperationsInput | $Enums.UnitType
    boxSize?: NullableIntFieldUpdateOperationsInput | number | null
    quantity?: IntFieldUpdateOperationsInput | number
    boxesCount?: NullableIntFieldUpdateOperationsInput | number | null
    purchasePrice?: BigIntFieldUpdateOperationsInput | bigint | number
    purchasePricePerUnit?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    calculatedPrice?: BigIntFieldUpdateOperationsInput | bigint | number
    roundedPrice?: BigIntFieldUpdateOperationsInput | bigint | number
    priceChanged?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceItemCreateManyInput = {
    id?: number
    invoiceId: number
    productId?: number | null
    productName: string
    unitType: $Enums.UnitType
    boxSize?: number | null
    quantity: number
    boxesCount?: number | null
    purchasePrice: bigint | number
    purchasePricePerUnit?: bigint | number | null
    calculatedPrice: bigint | number
    roundedPrice: bigint | number
    priceChanged?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvoiceItemUpdateManyMutationInput = {
    productName?: StringFieldUpdateOperationsInput | string
    unitType?: EnumUnitTypeFieldUpdateOperationsInput | $Enums.UnitType
    boxSize?: NullableIntFieldUpdateOperationsInput | number | null
    quantity?: IntFieldUpdateOperationsInput | number
    boxesCount?: NullableIntFieldUpdateOperationsInput | number | null
    purchasePrice?: BigIntFieldUpdateOperationsInput | bigint | number
    purchasePricePerUnit?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    calculatedPrice?: BigIntFieldUpdateOperationsInput | bigint | number
    roundedPrice?: BigIntFieldUpdateOperationsInput | bigint | number
    priceChanged?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceItemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    invoiceId?: IntFieldUpdateOperationsInput | number
    productId?: NullableIntFieldUpdateOperationsInput | number | null
    productName?: StringFieldUpdateOperationsInput | string
    unitType?: EnumUnitTypeFieldUpdateOperationsInput | $Enums.UnitType
    boxSize?: NullableIntFieldUpdateOperationsInput | number | null
    quantity?: IntFieldUpdateOperationsInput | number
    boxesCount?: NullableIntFieldUpdateOperationsInput | number | null
    purchasePrice?: BigIntFieldUpdateOperationsInput | bigint | number
    purchasePricePerUnit?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    calculatedPrice?: BigIntFieldUpdateOperationsInput | bigint | number
    roundedPrice?: BigIntFieldUpdateOperationsInput | bigint | number
    priceChanged?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RawInvoiceItemCreateInput = {
    rowIndex: number
    description: string
    rawQuantity?: string | null
    rawUnitPrice?: string | null
    rawAmount?: string | null
    createdAt?: Date | string
    invoicePhoto: InvoicePhotoCreateNestedOneWithoutRawInvoiceItemsInput
  }

  export type RawInvoiceItemUncheckedCreateInput = {
    id?: number
    invoicePhotoId: number
    rowIndex: number
    description: string
    rawQuantity?: string | null
    rawUnitPrice?: string | null
    rawAmount?: string | null
    createdAt?: Date | string
  }

  export type RawInvoiceItemUpdateInput = {
    rowIndex?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    rawQuantity?: NullableStringFieldUpdateOperationsInput | string | null
    rawUnitPrice?: NullableStringFieldUpdateOperationsInput | string | null
    rawAmount?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoicePhoto?: InvoicePhotoUpdateOneRequiredWithoutRawInvoiceItemsNestedInput
  }

  export type RawInvoiceItemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    invoicePhotoId?: IntFieldUpdateOperationsInput | number
    rowIndex?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    rawQuantity?: NullableStringFieldUpdateOperationsInput | string | null
    rawUnitPrice?: NullableStringFieldUpdateOperationsInput | string | null
    rawAmount?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RawInvoiceItemCreateManyInput = {
    id?: number
    invoicePhotoId: number
    rowIndex: number
    description: string
    rawQuantity?: string | null
    rawUnitPrice?: string | null
    rawAmount?: string | null
    createdAt?: Date | string
  }

  export type RawInvoiceItemUpdateManyMutationInput = {
    rowIndex?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    rawQuantity?: NullableStringFieldUpdateOperationsInput | string | null
    rawUnitPrice?: NullableStringFieldUpdateOperationsInput | string | null
    rawAmount?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RawInvoiceItemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    invoicePhotoId?: IntFieldUpdateOperationsInput | number
    rowIndex?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    rawQuantity?: NullableStringFieldUpdateOperationsInput | string | null
    rawUnitPrice?: NullableStringFieldUpdateOperationsInput | string | null
    rawAmount?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductPriceMemoryCreateInput = {
    purchasePrice: bigint | number
    salePrice: bigint | number
    source: $Enums.PriceSource
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutPriceMemoryInput
    agent: AgentCreateNestedOneWithoutPriceMemoryInput
  }

  export type ProductPriceMemoryUncheckedCreateInput = {
    id?: number
    productId: number
    agentId: number
    purchasePrice: bigint | number
    salePrice: bigint | number
    source: $Enums.PriceSource
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductPriceMemoryUpdateInput = {
    purchasePrice?: BigIntFieldUpdateOperationsInput | bigint | number
    salePrice?: BigIntFieldUpdateOperationsInput | bigint | number
    source?: EnumPriceSourceFieldUpdateOperationsInput | $Enums.PriceSource
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutPriceMemoryNestedInput
    agent?: AgentUpdateOneRequiredWithoutPriceMemoryNestedInput
  }

  export type ProductPriceMemoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    agentId?: IntFieldUpdateOperationsInput | number
    purchasePrice?: BigIntFieldUpdateOperationsInput | bigint | number
    salePrice?: BigIntFieldUpdateOperationsInput | bigint | number
    source?: EnumPriceSourceFieldUpdateOperationsInput | $Enums.PriceSource
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductPriceMemoryCreateManyInput = {
    id?: number
    productId: number
    agentId: number
    purchasePrice: bigint | number
    salePrice: bigint | number
    source: $Enums.PriceSource
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductPriceMemoryUpdateManyMutationInput = {
    purchasePrice?: BigIntFieldUpdateOperationsInput | bigint | number
    salePrice?: BigIntFieldUpdateOperationsInput | bigint | number
    source?: EnumPriceSourceFieldUpdateOperationsInput | $Enums.PriceSource
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductPriceMemoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    agentId?: IntFieldUpdateOperationsInput | number
    purchasePrice?: BigIntFieldUpdateOperationsInput | bigint | number
    salePrice?: BigIntFieldUpdateOperationsInput | bigint | number
    source?: EnumPriceSourceFieldUpdateOperationsInput | $Enums.PriceSource
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoicePhotoCreateInput = {
    url: string
    processed?: boolean
    createdAt?: Date | string
    invoice: InvoiceCreateNestedOneWithoutPhotosInput
    rawInvoiceItems?: RawInvoiceItemCreateNestedManyWithoutInvoicePhotoInput
  }

  export type InvoicePhotoUncheckedCreateInput = {
    id?: number
    invoiceId: number
    url: string
    processed?: boolean
    createdAt?: Date | string
    rawInvoiceItems?: RawInvoiceItemUncheckedCreateNestedManyWithoutInvoicePhotoInput
  }

  export type InvoicePhotoUpdateInput = {
    url?: StringFieldUpdateOperationsInput | string
    processed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoice?: InvoiceUpdateOneRequiredWithoutPhotosNestedInput
    rawInvoiceItems?: RawInvoiceItemUpdateManyWithoutInvoicePhotoNestedInput
  }

  export type InvoicePhotoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    invoiceId?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    processed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rawInvoiceItems?: RawInvoiceItemUncheckedUpdateManyWithoutInvoicePhotoNestedInput
  }

  export type InvoicePhotoCreateManyInput = {
    id?: number
    invoiceId: number
    url: string
    processed?: boolean
    createdAt?: Date | string
  }

  export type InvoicePhotoUpdateManyMutationInput = {
    url?: StringFieldUpdateOperationsInput | string
    processed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoicePhotoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    invoiceId?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    processed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumAgentInvoiceFormatNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.AgentInvoiceFormat | EnumAgentInvoiceFormatFieldRefInput<$PrismaModel> | null
    in?: $Enums.AgentInvoiceFormat[] | ListEnumAgentInvoiceFormatFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AgentInvoiceFormat[] | ListEnumAgentInvoiceFormatFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAgentInvoiceFormatNullableFilter<$PrismaModel> | $Enums.AgentInvoiceFormat | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type InvoiceListRelationFilter = {
    every?: InvoiceWhereInput
    some?: InvoiceWhereInput
    none?: InvoiceWhereInput
  }

  export type ProductListRelationFilter = {
    every?: ProductWhereInput
    some?: ProductWhereInput
    none?: ProductWhereInput
  }

  export type ProductPriceMemoryListRelationFilter = {
    every?: ProductPriceMemoryWhereInput
    some?: ProductPriceMemoryWhereInput
    none?: ProductPriceMemoryWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type InvoiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductPriceMemoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AgentCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    markupPercent?: SortOrder
    format?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AgentAvgOrderByAggregateInput = {
    id?: SortOrder
    markupPercent?: SortOrder
  }

  export type AgentMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    markupPercent?: SortOrder
    format?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AgentMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    markupPercent?: SortOrder
    format?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AgentSumOrderByAggregateInput = {
    id?: SortOrder
    markupPercent?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumAgentInvoiceFormatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AgentInvoiceFormat | EnumAgentInvoiceFormatFieldRefInput<$PrismaModel> | null
    in?: $Enums.AgentInvoiceFormat[] | ListEnumAgentInvoiceFormatFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AgentInvoiceFormat[] | ListEnumAgentInvoiceFormatFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAgentInvoiceFormatNullableWithAggregatesFilter<$PrismaModel> | $Enums.AgentInvoiceFormat | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumAgentInvoiceFormatNullableFilter<$PrismaModel>
    _max?: NestedEnumAgentInvoiceFormatNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type AgentNullableScalarRelationFilter = {
    is?: AgentWhereInput | null
    isNot?: AgentWhereInput | null
  }

  export type InvoiceItemListRelationFilter = {
    every?: InvoiceItemWhereInput
    some?: InvoiceItemWhereInput
    none?: InvoiceItemWhereInput
  }

  export type InvoiceItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    agentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    agentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    agentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumInvoiceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.InvoiceType | EnumInvoiceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.InvoiceType[] | ListEnumInvoiceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvoiceType[] | ListEnumInvoiceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumInvoiceTypeFilter<$PrismaModel> | $Enums.InvoiceType
  }

  export type AgentScalarRelationFilter = {
    is?: AgentWhereInput
    isNot?: AgentWhereInput
  }

  export type InvoicePhotoListRelationFilter = {
    every?: InvoicePhotoWhereInput
    some?: InvoicePhotoWhereInput
    none?: InvoicePhotoWhereInput
  }

  export type InvoicePhotoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InvoiceCountOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    type?: SortOrder
    invoiceDate?: SortOrder
    markupPercent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvoiceAvgOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    markupPercent?: SortOrder
  }

  export type InvoiceMaxOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    type?: SortOrder
    invoiceDate?: SortOrder
    markupPercent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvoiceMinOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    type?: SortOrder
    invoiceDate?: SortOrder
    markupPercent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvoiceSumOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    markupPercent?: SortOrder
  }

  export type EnumInvoiceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InvoiceType | EnumInvoiceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.InvoiceType[] | ListEnumInvoiceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvoiceType[] | ListEnumInvoiceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumInvoiceTypeWithAggregatesFilter<$PrismaModel> | $Enums.InvoiceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInvoiceTypeFilter<$PrismaModel>
    _max?: NestedEnumInvoiceTypeFilter<$PrismaModel>
  }

  export type EnumUnitTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.UnitType | EnumUnitTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UnitType[] | ListEnumUnitTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UnitType[] | ListEnumUnitTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUnitTypeFilter<$PrismaModel> | $Enums.UnitType
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type InvoiceScalarRelationFilter = {
    is?: InvoiceWhereInput
    isNot?: InvoiceWhereInput
  }

  export type ProductNullableScalarRelationFilter = {
    is?: ProductWhereInput | null
    isNot?: ProductWhereInput | null
  }

  export type InvoiceItemCountOrderByAggregateInput = {
    id?: SortOrder
    invoiceId?: SortOrder
    productId?: SortOrder
    productName?: SortOrder
    unitType?: SortOrder
    boxSize?: SortOrder
    quantity?: SortOrder
    boxesCount?: SortOrder
    purchasePrice?: SortOrder
    purchasePricePerUnit?: SortOrder
    calculatedPrice?: SortOrder
    roundedPrice?: SortOrder
    priceChanged?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvoiceItemAvgOrderByAggregateInput = {
    id?: SortOrder
    invoiceId?: SortOrder
    productId?: SortOrder
    boxSize?: SortOrder
    quantity?: SortOrder
    boxesCount?: SortOrder
    purchasePrice?: SortOrder
    purchasePricePerUnit?: SortOrder
    calculatedPrice?: SortOrder
    roundedPrice?: SortOrder
  }

  export type InvoiceItemMaxOrderByAggregateInput = {
    id?: SortOrder
    invoiceId?: SortOrder
    productId?: SortOrder
    productName?: SortOrder
    unitType?: SortOrder
    boxSize?: SortOrder
    quantity?: SortOrder
    boxesCount?: SortOrder
    purchasePrice?: SortOrder
    purchasePricePerUnit?: SortOrder
    calculatedPrice?: SortOrder
    roundedPrice?: SortOrder
    priceChanged?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvoiceItemMinOrderByAggregateInput = {
    id?: SortOrder
    invoiceId?: SortOrder
    productId?: SortOrder
    productName?: SortOrder
    unitType?: SortOrder
    boxSize?: SortOrder
    quantity?: SortOrder
    boxesCount?: SortOrder
    purchasePrice?: SortOrder
    purchasePricePerUnit?: SortOrder
    calculatedPrice?: SortOrder
    roundedPrice?: SortOrder
    priceChanged?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InvoiceItemSumOrderByAggregateInput = {
    id?: SortOrder
    invoiceId?: SortOrder
    productId?: SortOrder
    boxSize?: SortOrder
    quantity?: SortOrder
    boxesCount?: SortOrder
    purchasePrice?: SortOrder
    purchasePricePerUnit?: SortOrder
    calculatedPrice?: SortOrder
    roundedPrice?: SortOrder
  }

  export type EnumUnitTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UnitType | EnumUnitTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UnitType[] | ListEnumUnitTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UnitType[] | ListEnumUnitTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUnitTypeWithAggregatesFilter<$PrismaModel> | $Enums.UnitType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUnitTypeFilter<$PrismaModel>
    _max?: NestedEnumUnitTypeFilter<$PrismaModel>
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type InvoicePhotoScalarRelationFilter = {
    is?: InvoicePhotoWhereInput
    isNot?: InvoicePhotoWhereInput
  }

  export type RawInvoiceItemCountOrderByAggregateInput = {
    id?: SortOrder
    invoicePhotoId?: SortOrder
    rowIndex?: SortOrder
    description?: SortOrder
    rawQuantity?: SortOrder
    rawUnitPrice?: SortOrder
    rawAmount?: SortOrder
    createdAt?: SortOrder
  }

  export type RawInvoiceItemAvgOrderByAggregateInput = {
    id?: SortOrder
    invoicePhotoId?: SortOrder
    rowIndex?: SortOrder
  }

  export type RawInvoiceItemMaxOrderByAggregateInput = {
    id?: SortOrder
    invoicePhotoId?: SortOrder
    rowIndex?: SortOrder
    description?: SortOrder
    rawQuantity?: SortOrder
    rawUnitPrice?: SortOrder
    rawAmount?: SortOrder
    createdAt?: SortOrder
  }

  export type RawInvoiceItemMinOrderByAggregateInput = {
    id?: SortOrder
    invoicePhotoId?: SortOrder
    rowIndex?: SortOrder
    description?: SortOrder
    rawQuantity?: SortOrder
    rawUnitPrice?: SortOrder
    rawAmount?: SortOrder
    createdAt?: SortOrder
  }

  export type RawInvoiceItemSumOrderByAggregateInput = {
    id?: SortOrder
    invoicePhotoId?: SortOrder
    rowIndex?: SortOrder
  }

  export type EnumPriceSourceFilter<$PrismaModel = never> = {
    equals?: $Enums.PriceSource | EnumPriceSourceFieldRefInput<$PrismaModel>
    in?: $Enums.PriceSource[] | ListEnumPriceSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.PriceSource[] | ListEnumPriceSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumPriceSourceFilter<$PrismaModel> | $Enums.PriceSource
  }

  export type ProductScalarRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type ProductPriceMemoryProductIdAgentIdPurchasePriceCompoundUniqueInput = {
    productId: number
    agentId: number
    purchasePrice: bigint | number
  }

  export type ProductPriceMemoryCountOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    agentId?: SortOrder
    purchasePrice?: SortOrder
    salePrice?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductPriceMemoryAvgOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    agentId?: SortOrder
    purchasePrice?: SortOrder
    salePrice?: SortOrder
  }

  export type ProductPriceMemoryMaxOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    agentId?: SortOrder
    purchasePrice?: SortOrder
    salePrice?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductPriceMemoryMinOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    agentId?: SortOrder
    purchasePrice?: SortOrder
    salePrice?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductPriceMemorySumOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    agentId?: SortOrder
    purchasePrice?: SortOrder
    salePrice?: SortOrder
  }

  export type EnumPriceSourceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PriceSource | EnumPriceSourceFieldRefInput<$PrismaModel>
    in?: $Enums.PriceSource[] | ListEnumPriceSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.PriceSource[] | ListEnumPriceSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumPriceSourceWithAggregatesFilter<$PrismaModel> | $Enums.PriceSource
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPriceSourceFilter<$PrismaModel>
    _max?: NestedEnumPriceSourceFilter<$PrismaModel>
  }

  export type RawInvoiceItemListRelationFilter = {
    every?: RawInvoiceItemWhereInput
    some?: RawInvoiceItemWhereInput
    none?: RawInvoiceItemWhereInput
  }

  export type RawInvoiceItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InvoicePhotoCountOrderByAggregateInput = {
    id?: SortOrder
    invoiceId?: SortOrder
    url?: SortOrder
    processed?: SortOrder
    createdAt?: SortOrder
  }

  export type InvoicePhotoAvgOrderByAggregateInput = {
    id?: SortOrder
    invoiceId?: SortOrder
  }

  export type InvoicePhotoMaxOrderByAggregateInput = {
    id?: SortOrder
    invoiceId?: SortOrder
    url?: SortOrder
    processed?: SortOrder
    createdAt?: SortOrder
  }

  export type InvoicePhotoMinOrderByAggregateInput = {
    id?: SortOrder
    invoiceId?: SortOrder
    url?: SortOrder
    processed?: SortOrder
    createdAt?: SortOrder
  }

  export type InvoicePhotoSumOrderByAggregateInput = {
    id?: SortOrder
    invoiceId?: SortOrder
  }

  export type InvoiceCreateNestedManyWithoutAgentInput = {
    create?: XOR<InvoiceCreateWithoutAgentInput, InvoiceUncheckedCreateWithoutAgentInput> | InvoiceCreateWithoutAgentInput[] | InvoiceUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutAgentInput | InvoiceCreateOrConnectWithoutAgentInput[]
    createMany?: InvoiceCreateManyAgentInputEnvelope
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
  }

  export type ProductCreateNestedManyWithoutAgentInput = {
    create?: XOR<ProductCreateWithoutAgentInput, ProductUncheckedCreateWithoutAgentInput> | ProductCreateWithoutAgentInput[] | ProductUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutAgentInput | ProductCreateOrConnectWithoutAgentInput[]
    createMany?: ProductCreateManyAgentInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ProductPriceMemoryCreateNestedManyWithoutAgentInput = {
    create?: XOR<ProductPriceMemoryCreateWithoutAgentInput, ProductPriceMemoryUncheckedCreateWithoutAgentInput> | ProductPriceMemoryCreateWithoutAgentInput[] | ProductPriceMemoryUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: ProductPriceMemoryCreateOrConnectWithoutAgentInput | ProductPriceMemoryCreateOrConnectWithoutAgentInput[]
    createMany?: ProductPriceMemoryCreateManyAgentInputEnvelope
    connect?: ProductPriceMemoryWhereUniqueInput | ProductPriceMemoryWhereUniqueInput[]
  }

  export type InvoiceUncheckedCreateNestedManyWithoutAgentInput = {
    create?: XOR<InvoiceCreateWithoutAgentInput, InvoiceUncheckedCreateWithoutAgentInput> | InvoiceCreateWithoutAgentInput[] | InvoiceUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutAgentInput | InvoiceCreateOrConnectWithoutAgentInput[]
    createMany?: InvoiceCreateManyAgentInputEnvelope
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
  }

  export type ProductUncheckedCreateNestedManyWithoutAgentInput = {
    create?: XOR<ProductCreateWithoutAgentInput, ProductUncheckedCreateWithoutAgentInput> | ProductCreateWithoutAgentInput[] | ProductUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutAgentInput | ProductCreateOrConnectWithoutAgentInput[]
    createMany?: ProductCreateManyAgentInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ProductPriceMemoryUncheckedCreateNestedManyWithoutAgentInput = {
    create?: XOR<ProductPriceMemoryCreateWithoutAgentInput, ProductPriceMemoryUncheckedCreateWithoutAgentInput> | ProductPriceMemoryCreateWithoutAgentInput[] | ProductPriceMemoryUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: ProductPriceMemoryCreateOrConnectWithoutAgentInput | ProductPriceMemoryCreateOrConnectWithoutAgentInput[]
    createMany?: ProductPriceMemoryCreateManyAgentInputEnvelope
    connect?: ProductPriceMemoryWhereUniqueInput | ProductPriceMemoryWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableEnumAgentInvoiceFormatFieldUpdateOperationsInput = {
    set?: $Enums.AgentInvoiceFormat | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type InvoiceUpdateManyWithoutAgentNestedInput = {
    create?: XOR<InvoiceCreateWithoutAgentInput, InvoiceUncheckedCreateWithoutAgentInput> | InvoiceCreateWithoutAgentInput[] | InvoiceUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutAgentInput | InvoiceCreateOrConnectWithoutAgentInput[]
    upsert?: InvoiceUpsertWithWhereUniqueWithoutAgentInput | InvoiceUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: InvoiceCreateManyAgentInputEnvelope
    set?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    disconnect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    delete?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    update?: InvoiceUpdateWithWhereUniqueWithoutAgentInput | InvoiceUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: InvoiceUpdateManyWithWhereWithoutAgentInput | InvoiceUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
  }

  export type ProductUpdateManyWithoutAgentNestedInput = {
    create?: XOR<ProductCreateWithoutAgentInput, ProductUncheckedCreateWithoutAgentInput> | ProductCreateWithoutAgentInput[] | ProductUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutAgentInput | ProductCreateOrConnectWithoutAgentInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutAgentInput | ProductUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: ProductCreateManyAgentInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutAgentInput | ProductUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutAgentInput | ProductUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type ProductPriceMemoryUpdateManyWithoutAgentNestedInput = {
    create?: XOR<ProductPriceMemoryCreateWithoutAgentInput, ProductPriceMemoryUncheckedCreateWithoutAgentInput> | ProductPriceMemoryCreateWithoutAgentInput[] | ProductPriceMemoryUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: ProductPriceMemoryCreateOrConnectWithoutAgentInput | ProductPriceMemoryCreateOrConnectWithoutAgentInput[]
    upsert?: ProductPriceMemoryUpsertWithWhereUniqueWithoutAgentInput | ProductPriceMemoryUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: ProductPriceMemoryCreateManyAgentInputEnvelope
    set?: ProductPriceMemoryWhereUniqueInput | ProductPriceMemoryWhereUniqueInput[]
    disconnect?: ProductPriceMemoryWhereUniqueInput | ProductPriceMemoryWhereUniqueInput[]
    delete?: ProductPriceMemoryWhereUniqueInput | ProductPriceMemoryWhereUniqueInput[]
    connect?: ProductPriceMemoryWhereUniqueInput | ProductPriceMemoryWhereUniqueInput[]
    update?: ProductPriceMemoryUpdateWithWhereUniqueWithoutAgentInput | ProductPriceMemoryUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: ProductPriceMemoryUpdateManyWithWhereWithoutAgentInput | ProductPriceMemoryUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: ProductPriceMemoryScalarWhereInput | ProductPriceMemoryScalarWhereInput[]
  }

  export type InvoiceUncheckedUpdateManyWithoutAgentNestedInput = {
    create?: XOR<InvoiceCreateWithoutAgentInput, InvoiceUncheckedCreateWithoutAgentInput> | InvoiceCreateWithoutAgentInput[] | InvoiceUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: InvoiceCreateOrConnectWithoutAgentInput | InvoiceCreateOrConnectWithoutAgentInput[]
    upsert?: InvoiceUpsertWithWhereUniqueWithoutAgentInput | InvoiceUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: InvoiceCreateManyAgentInputEnvelope
    set?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    disconnect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    delete?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    connect?: InvoiceWhereUniqueInput | InvoiceWhereUniqueInput[]
    update?: InvoiceUpdateWithWhereUniqueWithoutAgentInput | InvoiceUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: InvoiceUpdateManyWithWhereWithoutAgentInput | InvoiceUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
  }

  export type ProductUncheckedUpdateManyWithoutAgentNestedInput = {
    create?: XOR<ProductCreateWithoutAgentInput, ProductUncheckedCreateWithoutAgentInput> | ProductCreateWithoutAgentInput[] | ProductUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutAgentInput | ProductCreateOrConnectWithoutAgentInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutAgentInput | ProductUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: ProductCreateManyAgentInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutAgentInput | ProductUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutAgentInput | ProductUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type ProductPriceMemoryUncheckedUpdateManyWithoutAgentNestedInput = {
    create?: XOR<ProductPriceMemoryCreateWithoutAgentInput, ProductPriceMemoryUncheckedCreateWithoutAgentInput> | ProductPriceMemoryCreateWithoutAgentInput[] | ProductPriceMemoryUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: ProductPriceMemoryCreateOrConnectWithoutAgentInput | ProductPriceMemoryCreateOrConnectWithoutAgentInput[]
    upsert?: ProductPriceMemoryUpsertWithWhereUniqueWithoutAgentInput | ProductPriceMemoryUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: ProductPriceMemoryCreateManyAgentInputEnvelope
    set?: ProductPriceMemoryWhereUniqueInput | ProductPriceMemoryWhereUniqueInput[]
    disconnect?: ProductPriceMemoryWhereUniqueInput | ProductPriceMemoryWhereUniqueInput[]
    delete?: ProductPriceMemoryWhereUniqueInput | ProductPriceMemoryWhereUniqueInput[]
    connect?: ProductPriceMemoryWhereUniqueInput | ProductPriceMemoryWhereUniqueInput[]
    update?: ProductPriceMemoryUpdateWithWhereUniqueWithoutAgentInput | ProductPriceMemoryUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: ProductPriceMemoryUpdateManyWithWhereWithoutAgentInput | ProductPriceMemoryUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: ProductPriceMemoryScalarWhereInput | ProductPriceMemoryScalarWhereInput[]
  }

  export type AgentCreateNestedOneWithoutProductsInput = {
    create?: XOR<AgentCreateWithoutProductsInput, AgentUncheckedCreateWithoutProductsInput>
    connectOrCreate?: AgentCreateOrConnectWithoutProductsInput
    connect?: AgentWhereUniqueInput
  }

  export type InvoiceItemCreateNestedManyWithoutProductInput = {
    create?: XOR<InvoiceItemCreateWithoutProductInput, InvoiceItemUncheckedCreateWithoutProductInput> | InvoiceItemCreateWithoutProductInput[] | InvoiceItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: InvoiceItemCreateOrConnectWithoutProductInput | InvoiceItemCreateOrConnectWithoutProductInput[]
    createMany?: InvoiceItemCreateManyProductInputEnvelope
    connect?: InvoiceItemWhereUniqueInput | InvoiceItemWhereUniqueInput[]
  }

  export type ProductPriceMemoryCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductPriceMemoryCreateWithoutProductInput, ProductPriceMemoryUncheckedCreateWithoutProductInput> | ProductPriceMemoryCreateWithoutProductInput[] | ProductPriceMemoryUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductPriceMemoryCreateOrConnectWithoutProductInput | ProductPriceMemoryCreateOrConnectWithoutProductInput[]
    createMany?: ProductPriceMemoryCreateManyProductInputEnvelope
    connect?: ProductPriceMemoryWhereUniqueInput | ProductPriceMemoryWhereUniqueInput[]
  }

  export type InvoiceItemUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<InvoiceItemCreateWithoutProductInput, InvoiceItemUncheckedCreateWithoutProductInput> | InvoiceItemCreateWithoutProductInput[] | InvoiceItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: InvoiceItemCreateOrConnectWithoutProductInput | InvoiceItemCreateOrConnectWithoutProductInput[]
    createMany?: InvoiceItemCreateManyProductInputEnvelope
    connect?: InvoiceItemWhereUniqueInput | InvoiceItemWhereUniqueInput[]
  }

  export type ProductPriceMemoryUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductPriceMemoryCreateWithoutProductInput, ProductPriceMemoryUncheckedCreateWithoutProductInput> | ProductPriceMemoryCreateWithoutProductInput[] | ProductPriceMemoryUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductPriceMemoryCreateOrConnectWithoutProductInput | ProductPriceMemoryCreateOrConnectWithoutProductInput[]
    createMany?: ProductPriceMemoryCreateManyProductInputEnvelope
    connect?: ProductPriceMemoryWhereUniqueInput | ProductPriceMemoryWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type AgentUpdateOneWithoutProductsNestedInput = {
    create?: XOR<AgentCreateWithoutProductsInput, AgentUncheckedCreateWithoutProductsInput>
    connectOrCreate?: AgentCreateOrConnectWithoutProductsInput
    upsert?: AgentUpsertWithoutProductsInput
    disconnect?: AgentWhereInput | boolean
    delete?: AgentWhereInput | boolean
    connect?: AgentWhereUniqueInput
    update?: XOR<XOR<AgentUpdateToOneWithWhereWithoutProductsInput, AgentUpdateWithoutProductsInput>, AgentUncheckedUpdateWithoutProductsInput>
  }

  export type InvoiceItemUpdateManyWithoutProductNestedInput = {
    create?: XOR<InvoiceItemCreateWithoutProductInput, InvoiceItemUncheckedCreateWithoutProductInput> | InvoiceItemCreateWithoutProductInput[] | InvoiceItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: InvoiceItemCreateOrConnectWithoutProductInput | InvoiceItemCreateOrConnectWithoutProductInput[]
    upsert?: InvoiceItemUpsertWithWhereUniqueWithoutProductInput | InvoiceItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: InvoiceItemCreateManyProductInputEnvelope
    set?: InvoiceItemWhereUniqueInput | InvoiceItemWhereUniqueInput[]
    disconnect?: InvoiceItemWhereUniqueInput | InvoiceItemWhereUniqueInput[]
    delete?: InvoiceItemWhereUniqueInput | InvoiceItemWhereUniqueInput[]
    connect?: InvoiceItemWhereUniqueInput | InvoiceItemWhereUniqueInput[]
    update?: InvoiceItemUpdateWithWhereUniqueWithoutProductInput | InvoiceItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: InvoiceItemUpdateManyWithWhereWithoutProductInput | InvoiceItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: InvoiceItemScalarWhereInput | InvoiceItemScalarWhereInput[]
  }

  export type ProductPriceMemoryUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductPriceMemoryCreateWithoutProductInput, ProductPriceMemoryUncheckedCreateWithoutProductInput> | ProductPriceMemoryCreateWithoutProductInput[] | ProductPriceMemoryUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductPriceMemoryCreateOrConnectWithoutProductInput | ProductPriceMemoryCreateOrConnectWithoutProductInput[]
    upsert?: ProductPriceMemoryUpsertWithWhereUniqueWithoutProductInput | ProductPriceMemoryUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductPriceMemoryCreateManyProductInputEnvelope
    set?: ProductPriceMemoryWhereUniqueInput | ProductPriceMemoryWhereUniqueInput[]
    disconnect?: ProductPriceMemoryWhereUniqueInput | ProductPriceMemoryWhereUniqueInput[]
    delete?: ProductPriceMemoryWhereUniqueInput | ProductPriceMemoryWhereUniqueInput[]
    connect?: ProductPriceMemoryWhereUniqueInput | ProductPriceMemoryWhereUniqueInput[]
    update?: ProductPriceMemoryUpdateWithWhereUniqueWithoutProductInput | ProductPriceMemoryUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductPriceMemoryUpdateManyWithWhereWithoutProductInput | ProductPriceMemoryUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductPriceMemoryScalarWhereInput | ProductPriceMemoryScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type InvoiceItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<InvoiceItemCreateWithoutProductInput, InvoiceItemUncheckedCreateWithoutProductInput> | InvoiceItemCreateWithoutProductInput[] | InvoiceItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: InvoiceItemCreateOrConnectWithoutProductInput | InvoiceItemCreateOrConnectWithoutProductInput[]
    upsert?: InvoiceItemUpsertWithWhereUniqueWithoutProductInput | InvoiceItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: InvoiceItemCreateManyProductInputEnvelope
    set?: InvoiceItemWhereUniqueInput | InvoiceItemWhereUniqueInput[]
    disconnect?: InvoiceItemWhereUniqueInput | InvoiceItemWhereUniqueInput[]
    delete?: InvoiceItemWhereUniqueInput | InvoiceItemWhereUniqueInput[]
    connect?: InvoiceItemWhereUniqueInput | InvoiceItemWhereUniqueInput[]
    update?: InvoiceItemUpdateWithWhereUniqueWithoutProductInput | InvoiceItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: InvoiceItemUpdateManyWithWhereWithoutProductInput | InvoiceItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: InvoiceItemScalarWhereInput | InvoiceItemScalarWhereInput[]
  }

  export type ProductPriceMemoryUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductPriceMemoryCreateWithoutProductInput, ProductPriceMemoryUncheckedCreateWithoutProductInput> | ProductPriceMemoryCreateWithoutProductInput[] | ProductPriceMemoryUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductPriceMemoryCreateOrConnectWithoutProductInput | ProductPriceMemoryCreateOrConnectWithoutProductInput[]
    upsert?: ProductPriceMemoryUpsertWithWhereUniqueWithoutProductInput | ProductPriceMemoryUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductPriceMemoryCreateManyProductInputEnvelope
    set?: ProductPriceMemoryWhereUniqueInput | ProductPriceMemoryWhereUniqueInput[]
    disconnect?: ProductPriceMemoryWhereUniqueInput | ProductPriceMemoryWhereUniqueInput[]
    delete?: ProductPriceMemoryWhereUniqueInput | ProductPriceMemoryWhereUniqueInput[]
    connect?: ProductPriceMemoryWhereUniqueInput | ProductPriceMemoryWhereUniqueInput[]
    update?: ProductPriceMemoryUpdateWithWhereUniqueWithoutProductInput | ProductPriceMemoryUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductPriceMemoryUpdateManyWithWhereWithoutProductInput | ProductPriceMemoryUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductPriceMemoryScalarWhereInput | ProductPriceMemoryScalarWhereInput[]
  }

  export type AgentCreateNestedOneWithoutInvoicesInput = {
    create?: XOR<AgentCreateWithoutInvoicesInput, AgentUncheckedCreateWithoutInvoicesInput>
    connectOrCreate?: AgentCreateOrConnectWithoutInvoicesInput
    connect?: AgentWhereUniqueInput
  }

  export type InvoiceItemCreateNestedManyWithoutInvoiceInput = {
    create?: XOR<InvoiceItemCreateWithoutInvoiceInput, InvoiceItemUncheckedCreateWithoutInvoiceInput> | InvoiceItemCreateWithoutInvoiceInput[] | InvoiceItemUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: InvoiceItemCreateOrConnectWithoutInvoiceInput | InvoiceItemCreateOrConnectWithoutInvoiceInput[]
    createMany?: InvoiceItemCreateManyInvoiceInputEnvelope
    connect?: InvoiceItemWhereUniqueInput | InvoiceItemWhereUniqueInput[]
  }

  export type InvoicePhotoCreateNestedManyWithoutInvoiceInput = {
    create?: XOR<InvoicePhotoCreateWithoutInvoiceInput, InvoicePhotoUncheckedCreateWithoutInvoiceInput> | InvoicePhotoCreateWithoutInvoiceInput[] | InvoicePhotoUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: InvoicePhotoCreateOrConnectWithoutInvoiceInput | InvoicePhotoCreateOrConnectWithoutInvoiceInput[]
    createMany?: InvoicePhotoCreateManyInvoiceInputEnvelope
    connect?: InvoicePhotoWhereUniqueInput | InvoicePhotoWhereUniqueInput[]
  }

  export type InvoiceItemUncheckedCreateNestedManyWithoutInvoiceInput = {
    create?: XOR<InvoiceItemCreateWithoutInvoiceInput, InvoiceItemUncheckedCreateWithoutInvoiceInput> | InvoiceItemCreateWithoutInvoiceInput[] | InvoiceItemUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: InvoiceItemCreateOrConnectWithoutInvoiceInput | InvoiceItemCreateOrConnectWithoutInvoiceInput[]
    createMany?: InvoiceItemCreateManyInvoiceInputEnvelope
    connect?: InvoiceItemWhereUniqueInput | InvoiceItemWhereUniqueInput[]
  }

  export type InvoicePhotoUncheckedCreateNestedManyWithoutInvoiceInput = {
    create?: XOR<InvoicePhotoCreateWithoutInvoiceInput, InvoicePhotoUncheckedCreateWithoutInvoiceInput> | InvoicePhotoCreateWithoutInvoiceInput[] | InvoicePhotoUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: InvoicePhotoCreateOrConnectWithoutInvoiceInput | InvoicePhotoCreateOrConnectWithoutInvoiceInput[]
    createMany?: InvoicePhotoCreateManyInvoiceInputEnvelope
    connect?: InvoicePhotoWhereUniqueInput | InvoicePhotoWhereUniqueInput[]
  }

  export type EnumInvoiceTypeFieldUpdateOperationsInput = {
    set?: $Enums.InvoiceType
  }

  export type AgentUpdateOneRequiredWithoutInvoicesNestedInput = {
    create?: XOR<AgentCreateWithoutInvoicesInput, AgentUncheckedCreateWithoutInvoicesInput>
    connectOrCreate?: AgentCreateOrConnectWithoutInvoicesInput
    upsert?: AgentUpsertWithoutInvoicesInput
    connect?: AgentWhereUniqueInput
    update?: XOR<XOR<AgentUpdateToOneWithWhereWithoutInvoicesInput, AgentUpdateWithoutInvoicesInput>, AgentUncheckedUpdateWithoutInvoicesInput>
  }

  export type InvoiceItemUpdateManyWithoutInvoiceNestedInput = {
    create?: XOR<InvoiceItemCreateWithoutInvoiceInput, InvoiceItemUncheckedCreateWithoutInvoiceInput> | InvoiceItemCreateWithoutInvoiceInput[] | InvoiceItemUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: InvoiceItemCreateOrConnectWithoutInvoiceInput | InvoiceItemCreateOrConnectWithoutInvoiceInput[]
    upsert?: InvoiceItemUpsertWithWhereUniqueWithoutInvoiceInput | InvoiceItemUpsertWithWhereUniqueWithoutInvoiceInput[]
    createMany?: InvoiceItemCreateManyInvoiceInputEnvelope
    set?: InvoiceItemWhereUniqueInput | InvoiceItemWhereUniqueInput[]
    disconnect?: InvoiceItemWhereUniqueInput | InvoiceItemWhereUniqueInput[]
    delete?: InvoiceItemWhereUniqueInput | InvoiceItemWhereUniqueInput[]
    connect?: InvoiceItemWhereUniqueInput | InvoiceItemWhereUniqueInput[]
    update?: InvoiceItemUpdateWithWhereUniqueWithoutInvoiceInput | InvoiceItemUpdateWithWhereUniqueWithoutInvoiceInput[]
    updateMany?: InvoiceItemUpdateManyWithWhereWithoutInvoiceInput | InvoiceItemUpdateManyWithWhereWithoutInvoiceInput[]
    deleteMany?: InvoiceItemScalarWhereInput | InvoiceItemScalarWhereInput[]
  }

  export type InvoicePhotoUpdateManyWithoutInvoiceNestedInput = {
    create?: XOR<InvoicePhotoCreateWithoutInvoiceInput, InvoicePhotoUncheckedCreateWithoutInvoiceInput> | InvoicePhotoCreateWithoutInvoiceInput[] | InvoicePhotoUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: InvoicePhotoCreateOrConnectWithoutInvoiceInput | InvoicePhotoCreateOrConnectWithoutInvoiceInput[]
    upsert?: InvoicePhotoUpsertWithWhereUniqueWithoutInvoiceInput | InvoicePhotoUpsertWithWhereUniqueWithoutInvoiceInput[]
    createMany?: InvoicePhotoCreateManyInvoiceInputEnvelope
    set?: InvoicePhotoWhereUniqueInput | InvoicePhotoWhereUniqueInput[]
    disconnect?: InvoicePhotoWhereUniqueInput | InvoicePhotoWhereUniqueInput[]
    delete?: InvoicePhotoWhereUniqueInput | InvoicePhotoWhereUniqueInput[]
    connect?: InvoicePhotoWhereUniqueInput | InvoicePhotoWhereUniqueInput[]
    update?: InvoicePhotoUpdateWithWhereUniqueWithoutInvoiceInput | InvoicePhotoUpdateWithWhereUniqueWithoutInvoiceInput[]
    updateMany?: InvoicePhotoUpdateManyWithWhereWithoutInvoiceInput | InvoicePhotoUpdateManyWithWhereWithoutInvoiceInput[]
    deleteMany?: InvoicePhotoScalarWhereInput | InvoicePhotoScalarWhereInput[]
  }

  export type InvoiceItemUncheckedUpdateManyWithoutInvoiceNestedInput = {
    create?: XOR<InvoiceItemCreateWithoutInvoiceInput, InvoiceItemUncheckedCreateWithoutInvoiceInput> | InvoiceItemCreateWithoutInvoiceInput[] | InvoiceItemUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: InvoiceItemCreateOrConnectWithoutInvoiceInput | InvoiceItemCreateOrConnectWithoutInvoiceInput[]
    upsert?: InvoiceItemUpsertWithWhereUniqueWithoutInvoiceInput | InvoiceItemUpsertWithWhereUniqueWithoutInvoiceInput[]
    createMany?: InvoiceItemCreateManyInvoiceInputEnvelope
    set?: InvoiceItemWhereUniqueInput | InvoiceItemWhereUniqueInput[]
    disconnect?: InvoiceItemWhereUniqueInput | InvoiceItemWhereUniqueInput[]
    delete?: InvoiceItemWhereUniqueInput | InvoiceItemWhereUniqueInput[]
    connect?: InvoiceItemWhereUniqueInput | InvoiceItemWhereUniqueInput[]
    update?: InvoiceItemUpdateWithWhereUniqueWithoutInvoiceInput | InvoiceItemUpdateWithWhereUniqueWithoutInvoiceInput[]
    updateMany?: InvoiceItemUpdateManyWithWhereWithoutInvoiceInput | InvoiceItemUpdateManyWithWhereWithoutInvoiceInput[]
    deleteMany?: InvoiceItemScalarWhereInput | InvoiceItemScalarWhereInput[]
  }

  export type InvoicePhotoUncheckedUpdateManyWithoutInvoiceNestedInput = {
    create?: XOR<InvoicePhotoCreateWithoutInvoiceInput, InvoicePhotoUncheckedCreateWithoutInvoiceInput> | InvoicePhotoCreateWithoutInvoiceInput[] | InvoicePhotoUncheckedCreateWithoutInvoiceInput[]
    connectOrCreate?: InvoicePhotoCreateOrConnectWithoutInvoiceInput | InvoicePhotoCreateOrConnectWithoutInvoiceInput[]
    upsert?: InvoicePhotoUpsertWithWhereUniqueWithoutInvoiceInput | InvoicePhotoUpsertWithWhereUniqueWithoutInvoiceInput[]
    createMany?: InvoicePhotoCreateManyInvoiceInputEnvelope
    set?: InvoicePhotoWhereUniqueInput | InvoicePhotoWhereUniqueInput[]
    disconnect?: InvoicePhotoWhereUniqueInput | InvoicePhotoWhereUniqueInput[]
    delete?: InvoicePhotoWhereUniqueInput | InvoicePhotoWhereUniqueInput[]
    connect?: InvoicePhotoWhereUniqueInput | InvoicePhotoWhereUniqueInput[]
    update?: InvoicePhotoUpdateWithWhereUniqueWithoutInvoiceInput | InvoicePhotoUpdateWithWhereUniqueWithoutInvoiceInput[]
    updateMany?: InvoicePhotoUpdateManyWithWhereWithoutInvoiceInput | InvoicePhotoUpdateManyWithWhereWithoutInvoiceInput[]
    deleteMany?: InvoicePhotoScalarWhereInput | InvoicePhotoScalarWhereInput[]
  }

  export type InvoiceCreateNestedOneWithoutItemsInput = {
    create?: XOR<InvoiceCreateWithoutItemsInput, InvoiceUncheckedCreateWithoutItemsInput>
    connectOrCreate?: InvoiceCreateOrConnectWithoutItemsInput
    connect?: InvoiceWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutInvoiceItemsInput = {
    create?: XOR<ProductCreateWithoutInvoiceItemsInput, ProductUncheckedCreateWithoutInvoiceItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutInvoiceItemsInput
    connect?: ProductWhereUniqueInput
  }

  export type EnumUnitTypeFieldUpdateOperationsInput = {
    set?: $Enums.UnitType
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type InvoiceUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<InvoiceCreateWithoutItemsInput, InvoiceUncheckedCreateWithoutItemsInput>
    connectOrCreate?: InvoiceCreateOrConnectWithoutItemsInput
    upsert?: InvoiceUpsertWithoutItemsInput
    connect?: InvoiceWhereUniqueInput
    update?: XOR<XOR<InvoiceUpdateToOneWithWhereWithoutItemsInput, InvoiceUpdateWithoutItemsInput>, InvoiceUncheckedUpdateWithoutItemsInput>
  }

  export type ProductUpdateOneWithoutInvoiceItemsNestedInput = {
    create?: XOR<ProductCreateWithoutInvoiceItemsInput, ProductUncheckedCreateWithoutInvoiceItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutInvoiceItemsInput
    upsert?: ProductUpsertWithoutInvoiceItemsInput
    disconnect?: ProductWhereInput | boolean
    delete?: ProductWhereInput | boolean
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutInvoiceItemsInput, ProductUpdateWithoutInvoiceItemsInput>, ProductUncheckedUpdateWithoutInvoiceItemsInput>
  }

  export type InvoicePhotoCreateNestedOneWithoutRawInvoiceItemsInput = {
    create?: XOR<InvoicePhotoCreateWithoutRawInvoiceItemsInput, InvoicePhotoUncheckedCreateWithoutRawInvoiceItemsInput>
    connectOrCreate?: InvoicePhotoCreateOrConnectWithoutRawInvoiceItemsInput
    connect?: InvoicePhotoWhereUniqueInput
  }

  export type InvoicePhotoUpdateOneRequiredWithoutRawInvoiceItemsNestedInput = {
    create?: XOR<InvoicePhotoCreateWithoutRawInvoiceItemsInput, InvoicePhotoUncheckedCreateWithoutRawInvoiceItemsInput>
    connectOrCreate?: InvoicePhotoCreateOrConnectWithoutRawInvoiceItemsInput
    upsert?: InvoicePhotoUpsertWithoutRawInvoiceItemsInput
    connect?: InvoicePhotoWhereUniqueInput
    update?: XOR<XOR<InvoicePhotoUpdateToOneWithWhereWithoutRawInvoiceItemsInput, InvoicePhotoUpdateWithoutRawInvoiceItemsInput>, InvoicePhotoUncheckedUpdateWithoutRawInvoiceItemsInput>
  }

  export type ProductCreateNestedOneWithoutPriceMemoryInput = {
    create?: XOR<ProductCreateWithoutPriceMemoryInput, ProductUncheckedCreateWithoutPriceMemoryInput>
    connectOrCreate?: ProductCreateOrConnectWithoutPriceMemoryInput
    connect?: ProductWhereUniqueInput
  }

  export type AgentCreateNestedOneWithoutPriceMemoryInput = {
    create?: XOR<AgentCreateWithoutPriceMemoryInput, AgentUncheckedCreateWithoutPriceMemoryInput>
    connectOrCreate?: AgentCreateOrConnectWithoutPriceMemoryInput
    connect?: AgentWhereUniqueInput
  }

  export type EnumPriceSourceFieldUpdateOperationsInput = {
    set?: $Enums.PriceSource
  }

  export type ProductUpdateOneRequiredWithoutPriceMemoryNestedInput = {
    create?: XOR<ProductCreateWithoutPriceMemoryInput, ProductUncheckedCreateWithoutPriceMemoryInput>
    connectOrCreate?: ProductCreateOrConnectWithoutPriceMemoryInput
    upsert?: ProductUpsertWithoutPriceMemoryInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutPriceMemoryInput, ProductUpdateWithoutPriceMemoryInput>, ProductUncheckedUpdateWithoutPriceMemoryInput>
  }

  export type AgentUpdateOneRequiredWithoutPriceMemoryNestedInput = {
    create?: XOR<AgentCreateWithoutPriceMemoryInput, AgentUncheckedCreateWithoutPriceMemoryInput>
    connectOrCreate?: AgentCreateOrConnectWithoutPriceMemoryInput
    upsert?: AgentUpsertWithoutPriceMemoryInput
    connect?: AgentWhereUniqueInput
    update?: XOR<XOR<AgentUpdateToOneWithWhereWithoutPriceMemoryInput, AgentUpdateWithoutPriceMemoryInput>, AgentUncheckedUpdateWithoutPriceMemoryInput>
  }

  export type InvoiceCreateNestedOneWithoutPhotosInput = {
    create?: XOR<InvoiceCreateWithoutPhotosInput, InvoiceUncheckedCreateWithoutPhotosInput>
    connectOrCreate?: InvoiceCreateOrConnectWithoutPhotosInput
    connect?: InvoiceWhereUniqueInput
  }

  export type RawInvoiceItemCreateNestedManyWithoutInvoicePhotoInput = {
    create?: XOR<RawInvoiceItemCreateWithoutInvoicePhotoInput, RawInvoiceItemUncheckedCreateWithoutInvoicePhotoInput> | RawInvoiceItemCreateWithoutInvoicePhotoInput[] | RawInvoiceItemUncheckedCreateWithoutInvoicePhotoInput[]
    connectOrCreate?: RawInvoiceItemCreateOrConnectWithoutInvoicePhotoInput | RawInvoiceItemCreateOrConnectWithoutInvoicePhotoInput[]
    createMany?: RawInvoiceItemCreateManyInvoicePhotoInputEnvelope
    connect?: RawInvoiceItemWhereUniqueInput | RawInvoiceItemWhereUniqueInput[]
  }

  export type RawInvoiceItemUncheckedCreateNestedManyWithoutInvoicePhotoInput = {
    create?: XOR<RawInvoiceItemCreateWithoutInvoicePhotoInput, RawInvoiceItemUncheckedCreateWithoutInvoicePhotoInput> | RawInvoiceItemCreateWithoutInvoicePhotoInput[] | RawInvoiceItemUncheckedCreateWithoutInvoicePhotoInput[]
    connectOrCreate?: RawInvoiceItemCreateOrConnectWithoutInvoicePhotoInput | RawInvoiceItemCreateOrConnectWithoutInvoicePhotoInput[]
    createMany?: RawInvoiceItemCreateManyInvoicePhotoInputEnvelope
    connect?: RawInvoiceItemWhereUniqueInput | RawInvoiceItemWhereUniqueInput[]
  }

  export type InvoiceUpdateOneRequiredWithoutPhotosNestedInput = {
    create?: XOR<InvoiceCreateWithoutPhotosInput, InvoiceUncheckedCreateWithoutPhotosInput>
    connectOrCreate?: InvoiceCreateOrConnectWithoutPhotosInput
    upsert?: InvoiceUpsertWithoutPhotosInput
    connect?: InvoiceWhereUniqueInput
    update?: XOR<XOR<InvoiceUpdateToOneWithWhereWithoutPhotosInput, InvoiceUpdateWithoutPhotosInput>, InvoiceUncheckedUpdateWithoutPhotosInput>
  }

  export type RawInvoiceItemUpdateManyWithoutInvoicePhotoNestedInput = {
    create?: XOR<RawInvoiceItemCreateWithoutInvoicePhotoInput, RawInvoiceItemUncheckedCreateWithoutInvoicePhotoInput> | RawInvoiceItemCreateWithoutInvoicePhotoInput[] | RawInvoiceItemUncheckedCreateWithoutInvoicePhotoInput[]
    connectOrCreate?: RawInvoiceItemCreateOrConnectWithoutInvoicePhotoInput | RawInvoiceItemCreateOrConnectWithoutInvoicePhotoInput[]
    upsert?: RawInvoiceItemUpsertWithWhereUniqueWithoutInvoicePhotoInput | RawInvoiceItemUpsertWithWhereUniqueWithoutInvoicePhotoInput[]
    createMany?: RawInvoiceItemCreateManyInvoicePhotoInputEnvelope
    set?: RawInvoiceItemWhereUniqueInput | RawInvoiceItemWhereUniqueInput[]
    disconnect?: RawInvoiceItemWhereUniqueInput | RawInvoiceItemWhereUniqueInput[]
    delete?: RawInvoiceItemWhereUniqueInput | RawInvoiceItemWhereUniqueInput[]
    connect?: RawInvoiceItemWhereUniqueInput | RawInvoiceItemWhereUniqueInput[]
    update?: RawInvoiceItemUpdateWithWhereUniqueWithoutInvoicePhotoInput | RawInvoiceItemUpdateWithWhereUniqueWithoutInvoicePhotoInput[]
    updateMany?: RawInvoiceItemUpdateManyWithWhereWithoutInvoicePhotoInput | RawInvoiceItemUpdateManyWithWhereWithoutInvoicePhotoInput[]
    deleteMany?: RawInvoiceItemScalarWhereInput | RawInvoiceItemScalarWhereInput[]
  }

  export type RawInvoiceItemUncheckedUpdateManyWithoutInvoicePhotoNestedInput = {
    create?: XOR<RawInvoiceItemCreateWithoutInvoicePhotoInput, RawInvoiceItemUncheckedCreateWithoutInvoicePhotoInput> | RawInvoiceItemCreateWithoutInvoicePhotoInput[] | RawInvoiceItemUncheckedCreateWithoutInvoicePhotoInput[]
    connectOrCreate?: RawInvoiceItemCreateOrConnectWithoutInvoicePhotoInput | RawInvoiceItemCreateOrConnectWithoutInvoicePhotoInput[]
    upsert?: RawInvoiceItemUpsertWithWhereUniqueWithoutInvoicePhotoInput | RawInvoiceItemUpsertWithWhereUniqueWithoutInvoicePhotoInput[]
    createMany?: RawInvoiceItemCreateManyInvoicePhotoInputEnvelope
    set?: RawInvoiceItemWhereUniqueInput | RawInvoiceItemWhereUniqueInput[]
    disconnect?: RawInvoiceItemWhereUniqueInput | RawInvoiceItemWhereUniqueInput[]
    delete?: RawInvoiceItemWhereUniqueInput | RawInvoiceItemWhereUniqueInput[]
    connect?: RawInvoiceItemWhereUniqueInput | RawInvoiceItemWhereUniqueInput[]
    update?: RawInvoiceItemUpdateWithWhereUniqueWithoutInvoicePhotoInput | RawInvoiceItemUpdateWithWhereUniqueWithoutInvoicePhotoInput[]
    updateMany?: RawInvoiceItemUpdateManyWithWhereWithoutInvoicePhotoInput | RawInvoiceItemUpdateManyWithWhereWithoutInvoicePhotoInput[]
    deleteMany?: RawInvoiceItemScalarWhereInput | RawInvoiceItemScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumAgentInvoiceFormatNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.AgentInvoiceFormat | EnumAgentInvoiceFormatFieldRefInput<$PrismaModel> | null
    in?: $Enums.AgentInvoiceFormat[] | ListEnumAgentInvoiceFormatFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AgentInvoiceFormat[] | ListEnumAgentInvoiceFormatFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAgentInvoiceFormatNullableFilter<$PrismaModel> | $Enums.AgentInvoiceFormat | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumAgentInvoiceFormatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AgentInvoiceFormat | EnumAgentInvoiceFormatFieldRefInput<$PrismaModel> | null
    in?: $Enums.AgentInvoiceFormat[] | ListEnumAgentInvoiceFormatFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AgentInvoiceFormat[] | ListEnumAgentInvoiceFormatFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAgentInvoiceFormatNullableWithAggregatesFilter<$PrismaModel> | $Enums.AgentInvoiceFormat | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumAgentInvoiceFormatNullableFilter<$PrismaModel>
    _max?: NestedEnumAgentInvoiceFormatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumInvoiceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.InvoiceType | EnumInvoiceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.InvoiceType[] | ListEnumInvoiceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvoiceType[] | ListEnumInvoiceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumInvoiceTypeFilter<$PrismaModel> | $Enums.InvoiceType
  }

  export type NestedEnumInvoiceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InvoiceType | EnumInvoiceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.InvoiceType[] | ListEnumInvoiceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.InvoiceType[] | ListEnumInvoiceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumInvoiceTypeWithAggregatesFilter<$PrismaModel> | $Enums.InvoiceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInvoiceTypeFilter<$PrismaModel>
    _max?: NestedEnumInvoiceTypeFilter<$PrismaModel>
  }

  export type NestedEnumUnitTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.UnitType | EnumUnitTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UnitType[] | ListEnumUnitTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UnitType[] | ListEnumUnitTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUnitTypeFilter<$PrismaModel> | $Enums.UnitType
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumUnitTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UnitType | EnumUnitTypeFieldRefInput<$PrismaModel>
    in?: $Enums.UnitType[] | ListEnumUnitTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.UnitType[] | ListEnumUnitTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumUnitTypeWithAggregatesFilter<$PrismaModel> | $Enums.UnitType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUnitTypeFilter<$PrismaModel>
    _max?: NestedEnumUnitTypeFilter<$PrismaModel>
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumPriceSourceFilter<$PrismaModel = never> = {
    equals?: $Enums.PriceSource | EnumPriceSourceFieldRefInput<$PrismaModel>
    in?: $Enums.PriceSource[] | ListEnumPriceSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.PriceSource[] | ListEnumPriceSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumPriceSourceFilter<$PrismaModel> | $Enums.PriceSource
  }

  export type NestedEnumPriceSourceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PriceSource | EnumPriceSourceFieldRefInput<$PrismaModel>
    in?: $Enums.PriceSource[] | ListEnumPriceSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.PriceSource[] | ListEnumPriceSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumPriceSourceWithAggregatesFilter<$PrismaModel> | $Enums.PriceSource
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPriceSourceFilter<$PrismaModel>
    _max?: NestedEnumPriceSourceFilter<$PrismaModel>
  }

  export type InvoiceCreateWithoutAgentInput = {
    type: $Enums.InvoiceType
    invoiceDate: Date | string
    markupPercent: number
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: InvoiceItemCreateNestedManyWithoutInvoiceInput
    photos?: InvoicePhotoCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceUncheckedCreateWithoutAgentInput = {
    id?: number
    type: $Enums.InvoiceType
    invoiceDate: Date | string
    markupPercent: number
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: InvoiceItemUncheckedCreateNestedManyWithoutInvoiceInput
    photos?: InvoicePhotoUncheckedCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceCreateOrConnectWithoutAgentInput = {
    where: InvoiceWhereUniqueInput
    create: XOR<InvoiceCreateWithoutAgentInput, InvoiceUncheckedCreateWithoutAgentInput>
  }

  export type InvoiceCreateManyAgentInputEnvelope = {
    data: InvoiceCreateManyAgentInput | InvoiceCreateManyAgentInput[]
    skipDuplicates?: boolean
  }

  export type ProductCreateWithoutAgentInput = {
    name: string
    category?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invoiceItems?: InvoiceItemCreateNestedManyWithoutProductInput
    priceMemory?: ProductPriceMemoryCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutAgentInput = {
    id?: number
    name: string
    category?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invoiceItems?: InvoiceItemUncheckedCreateNestedManyWithoutProductInput
    priceMemory?: ProductPriceMemoryUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutAgentInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutAgentInput, ProductUncheckedCreateWithoutAgentInput>
  }

  export type ProductCreateManyAgentInputEnvelope = {
    data: ProductCreateManyAgentInput | ProductCreateManyAgentInput[]
    skipDuplicates?: boolean
  }

  export type ProductPriceMemoryCreateWithoutAgentInput = {
    purchasePrice: bigint | number
    salePrice: bigint | number
    source: $Enums.PriceSource
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutPriceMemoryInput
  }

  export type ProductPriceMemoryUncheckedCreateWithoutAgentInput = {
    id?: number
    productId: number
    purchasePrice: bigint | number
    salePrice: bigint | number
    source: $Enums.PriceSource
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductPriceMemoryCreateOrConnectWithoutAgentInput = {
    where: ProductPriceMemoryWhereUniqueInput
    create: XOR<ProductPriceMemoryCreateWithoutAgentInput, ProductPriceMemoryUncheckedCreateWithoutAgentInput>
  }

  export type ProductPriceMemoryCreateManyAgentInputEnvelope = {
    data: ProductPriceMemoryCreateManyAgentInput | ProductPriceMemoryCreateManyAgentInput[]
    skipDuplicates?: boolean
  }

  export type InvoiceUpsertWithWhereUniqueWithoutAgentInput = {
    where: InvoiceWhereUniqueInput
    update: XOR<InvoiceUpdateWithoutAgentInput, InvoiceUncheckedUpdateWithoutAgentInput>
    create: XOR<InvoiceCreateWithoutAgentInput, InvoiceUncheckedCreateWithoutAgentInput>
  }

  export type InvoiceUpdateWithWhereUniqueWithoutAgentInput = {
    where: InvoiceWhereUniqueInput
    data: XOR<InvoiceUpdateWithoutAgentInput, InvoiceUncheckedUpdateWithoutAgentInput>
  }

  export type InvoiceUpdateManyWithWhereWithoutAgentInput = {
    where: InvoiceScalarWhereInput
    data: XOR<InvoiceUpdateManyMutationInput, InvoiceUncheckedUpdateManyWithoutAgentInput>
  }

  export type InvoiceScalarWhereInput = {
    AND?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
    OR?: InvoiceScalarWhereInput[]
    NOT?: InvoiceScalarWhereInput | InvoiceScalarWhereInput[]
    id?: IntFilter<"Invoice"> | number
    agentId?: IntFilter<"Invoice"> | number
    type?: EnumInvoiceTypeFilter<"Invoice"> | $Enums.InvoiceType
    invoiceDate?: DateTimeFilter<"Invoice"> | Date | string
    markupPercent?: IntFilter<"Invoice"> | number
    createdAt?: DateTimeFilter<"Invoice"> | Date | string
    updatedAt?: DateTimeFilter<"Invoice"> | Date | string
  }

  export type ProductUpsertWithWhereUniqueWithoutAgentInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutAgentInput, ProductUncheckedUpdateWithoutAgentInput>
    create: XOR<ProductCreateWithoutAgentInput, ProductUncheckedCreateWithoutAgentInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutAgentInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutAgentInput, ProductUncheckedUpdateWithoutAgentInput>
  }

  export type ProductUpdateManyWithWhereWithoutAgentInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutAgentInput>
  }

  export type ProductScalarWhereInput = {
    AND?: ProductScalarWhereInput | ProductScalarWhereInput[]
    OR?: ProductScalarWhereInput[]
    NOT?: ProductScalarWhereInput | ProductScalarWhereInput[]
    id?: IntFilter<"Product"> | number
    name?: StringFilter<"Product"> | string
    category?: StringNullableFilter<"Product"> | string | null
    agentId?: IntNullableFilter<"Product"> | number | null
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
  }

  export type ProductPriceMemoryUpsertWithWhereUniqueWithoutAgentInput = {
    where: ProductPriceMemoryWhereUniqueInput
    update: XOR<ProductPriceMemoryUpdateWithoutAgentInput, ProductPriceMemoryUncheckedUpdateWithoutAgentInput>
    create: XOR<ProductPriceMemoryCreateWithoutAgentInput, ProductPriceMemoryUncheckedCreateWithoutAgentInput>
  }

  export type ProductPriceMemoryUpdateWithWhereUniqueWithoutAgentInput = {
    where: ProductPriceMemoryWhereUniqueInput
    data: XOR<ProductPriceMemoryUpdateWithoutAgentInput, ProductPriceMemoryUncheckedUpdateWithoutAgentInput>
  }

  export type ProductPriceMemoryUpdateManyWithWhereWithoutAgentInput = {
    where: ProductPriceMemoryScalarWhereInput
    data: XOR<ProductPriceMemoryUpdateManyMutationInput, ProductPriceMemoryUncheckedUpdateManyWithoutAgentInput>
  }

  export type ProductPriceMemoryScalarWhereInput = {
    AND?: ProductPriceMemoryScalarWhereInput | ProductPriceMemoryScalarWhereInput[]
    OR?: ProductPriceMemoryScalarWhereInput[]
    NOT?: ProductPriceMemoryScalarWhereInput | ProductPriceMemoryScalarWhereInput[]
    id?: IntFilter<"ProductPriceMemory"> | number
    productId?: IntFilter<"ProductPriceMemory"> | number
    agentId?: IntFilter<"ProductPriceMemory"> | number
    purchasePrice?: BigIntFilter<"ProductPriceMemory"> | bigint | number
    salePrice?: BigIntFilter<"ProductPriceMemory"> | bigint | number
    source?: EnumPriceSourceFilter<"ProductPriceMemory"> | $Enums.PriceSource
    createdAt?: DateTimeFilter<"ProductPriceMemory"> | Date | string
    updatedAt?: DateTimeFilter<"ProductPriceMemory"> | Date | string
  }

  export type AgentCreateWithoutProductsInput = {
    name: string
    markupPercent: number
    format?: $Enums.AgentInvoiceFormat | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invoices?: InvoiceCreateNestedManyWithoutAgentInput
    priceMemory?: ProductPriceMemoryCreateNestedManyWithoutAgentInput
  }

  export type AgentUncheckedCreateWithoutProductsInput = {
    id?: number
    name: string
    markupPercent: number
    format?: $Enums.AgentInvoiceFormat | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invoices?: InvoiceUncheckedCreateNestedManyWithoutAgentInput
    priceMemory?: ProductPriceMemoryUncheckedCreateNestedManyWithoutAgentInput
  }

  export type AgentCreateOrConnectWithoutProductsInput = {
    where: AgentWhereUniqueInput
    create: XOR<AgentCreateWithoutProductsInput, AgentUncheckedCreateWithoutProductsInput>
  }

  export type InvoiceItemCreateWithoutProductInput = {
    productName: string
    unitType: $Enums.UnitType
    boxSize?: number | null
    quantity: number
    boxesCount?: number | null
    purchasePrice: bigint | number
    purchasePricePerUnit?: bigint | number | null
    calculatedPrice: bigint | number
    roundedPrice: bigint | number
    priceChanged?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    invoice: InvoiceCreateNestedOneWithoutItemsInput
  }

  export type InvoiceItemUncheckedCreateWithoutProductInput = {
    id?: number
    invoiceId: number
    productName: string
    unitType: $Enums.UnitType
    boxSize?: number | null
    quantity: number
    boxesCount?: number | null
    purchasePrice: bigint | number
    purchasePricePerUnit?: bigint | number | null
    calculatedPrice: bigint | number
    roundedPrice: bigint | number
    priceChanged?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvoiceItemCreateOrConnectWithoutProductInput = {
    where: InvoiceItemWhereUniqueInput
    create: XOR<InvoiceItemCreateWithoutProductInput, InvoiceItemUncheckedCreateWithoutProductInput>
  }

  export type InvoiceItemCreateManyProductInputEnvelope = {
    data: InvoiceItemCreateManyProductInput | InvoiceItemCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type ProductPriceMemoryCreateWithoutProductInput = {
    purchasePrice: bigint | number
    salePrice: bigint | number
    source: $Enums.PriceSource
    createdAt?: Date | string
    updatedAt?: Date | string
    agent: AgentCreateNestedOneWithoutPriceMemoryInput
  }

  export type ProductPriceMemoryUncheckedCreateWithoutProductInput = {
    id?: number
    agentId: number
    purchasePrice: bigint | number
    salePrice: bigint | number
    source: $Enums.PriceSource
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductPriceMemoryCreateOrConnectWithoutProductInput = {
    where: ProductPriceMemoryWhereUniqueInput
    create: XOR<ProductPriceMemoryCreateWithoutProductInput, ProductPriceMemoryUncheckedCreateWithoutProductInput>
  }

  export type ProductPriceMemoryCreateManyProductInputEnvelope = {
    data: ProductPriceMemoryCreateManyProductInput | ProductPriceMemoryCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type AgentUpsertWithoutProductsInput = {
    update: XOR<AgentUpdateWithoutProductsInput, AgentUncheckedUpdateWithoutProductsInput>
    create: XOR<AgentCreateWithoutProductsInput, AgentUncheckedCreateWithoutProductsInput>
    where?: AgentWhereInput
  }

  export type AgentUpdateToOneWithWhereWithoutProductsInput = {
    where?: AgentWhereInput
    data: XOR<AgentUpdateWithoutProductsInput, AgentUncheckedUpdateWithoutProductsInput>
  }

  export type AgentUpdateWithoutProductsInput = {
    name?: StringFieldUpdateOperationsInput | string
    markupPercent?: IntFieldUpdateOperationsInput | number
    format?: NullableEnumAgentInvoiceFormatFieldUpdateOperationsInput | $Enums.AgentInvoiceFormat | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoices?: InvoiceUpdateManyWithoutAgentNestedInput
    priceMemory?: ProductPriceMemoryUpdateManyWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateWithoutProductsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    markupPercent?: IntFieldUpdateOperationsInput | number
    format?: NullableEnumAgentInvoiceFormatFieldUpdateOperationsInput | $Enums.AgentInvoiceFormat | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoices?: InvoiceUncheckedUpdateManyWithoutAgentNestedInput
    priceMemory?: ProductPriceMemoryUncheckedUpdateManyWithoutAgentNestedInput
  }

  export type InvoiceItemUpsertWithWhereUniqueWithoutProductInput = {
    where: InvoiceItemWhereUniqueInput
    update: XOR<InvoiceItemUpdateWithoutProductInput, InvoiceItemUncheckedUpdateWithoutProductInput>
    create: XOR<InvoiceItemCreateWithoutProductInput, InvoiceItemUncheckedCreateWithoutProductInput>
  }

  export type InvoiceItemUpdateWithWhereUniqueWithoutProductInput = {
    where: InvoiceItemWhereUniqueInput
    data: XOR<InvoiceItemUpdateWithoutProductInput, InvoiceItemUncheckedUpdateWithoutProductInput>
  }

  export type InvoiceItemUpdateManyWithWhereWithoutProductInput = {
    where: InvoiceItemScalarWhereInput
    data: XOR<InvoiceItemUpdateManyMutationInput, InvoiceItemUncheckedUpdateManyWithoutProductInput>
  }

  export type InvoiceItemScalarWhereInput = {
    AND?: InvoiceItemScalarWhereInput | InvoiceItemScalarWhereInput[]
    OR?: InvoiceItemScalarWhereInput[]
    NOT?: InvoiceItemScalarWhereInput | InvoiceItemScalarWhereInput[]
    id?: IntFilter<"InvoiceItem"> | number
    invoiceId?: IntFilter<"InvoiceItem"> | number
    productId?: IntNullableFilter<"InvoiceItem"> | number | null
    productName?: StringFilter<"InvoiceItem"> | string
    unitType?: EnumUnitTypeFilter<"InvoiceItem"> | $Enums.UnitType
    boxSize?: IntNullableFilter<"InvoiceItem"> | number | null
    quantity?: IntFilter<"InvoiceItem"> | number
    boxesCount?: IntNullableFilter<"InvoiceItem"> | number | null
    purchasePrice?: BigIntFilter<"InvoiceItem"> | bigint | number
    purchasePricePerUnit?: BigIntNullableFilter<"InvoiceItem"> | bigint | number | null
    calculatedPrice?: BigIntFilter<"InvoiceItem"> | bigint | number
    roundedPrice?: BigIntFilter<"InvoiceItem"> | bigint | number
    priceChanged?: BoolFilter<"InvoiceItem"> | boolean
    createdAt?: DateTimeFilter<"InvoiceItem"> | Date | string
    updatedAt?: DateTimeFilter<"InvoiceItem"> | Date | string
  }

  export type ProductPriceMemoryUpsertWithWhereUniqueWithoutProductInput = {
    where: ProductPriceMemoryWhereUniqueInput
    update: XOR<ProductPriceMemoryUpdateWithoutProductInput, ProductPriceMemoryUncheckedUpdateWithoutProductInput>
    create: XOR<ProductPriceMemoryCreateWithoutProductInput, ProductPriceMemoryUncheckedCreateWithoutProductInput>
  }

  export type ProductPriceMemoryUpdateWithWhereUniqueWithoutProductInput = {
    where: ProductPriceMemoryWhereUniqueInput
    data: XOR<ProductPriceMemoryUpdateWithoutProductInput, ProductPriceMemoryUncheckedUpdateWithoutProductInput>
  }

  export type ProductPriceMemoryUpdateManyWithWhereWithoutProductInput = {
    where: ProductPriceMemoryScalarWhereInput
    data: XOR<ProductPriceMemoryUpdateManyMutationInput, ProductPriceMemoryUncheckedUpdateManyWithoutProductInput>
  }

  export type AgentCreateWithoutInvoicesInput = {
    name: string
    markupPercent: number
    format?: $Enums.AgentInvoiceFormat | null
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductCreateNestedManyWithoutAgentInput
    priceMemory?: ProductPriceMemoryCreateNestedManyWithoutAgentInput
  }

  export type AgentUncheckedCreateWithoutInvoicesInput = {
    id?: number
    name: string
    markupPercent: number
    format?: $Enums.AgentInvoiceFormat | null
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductUncheckedCreateNestedManyWithoutAgentInput
    priceMemory?: ProductPriceMemoryUncheckedCreateNestedManyWithoutAgentInput
  }

  export type AgentCreateOrConnectWithoutInvoicesInput = {
    where: AgentWhereUniqueInput
    create: XOR<AgentCreateWithoutInvoicesInput, AgentUncheckedCreateWithoutInvoicesInput>
  }

  export type InvoiceItemCreateWithoutInvoiceInput = {
    productName: string
    unitType: $Enums.UnitType
    boxSize?: number | null
    quantity: number
    boxesCount?: number | null
    purchasePrice: bigint | number
    purchasePricePerUnit?: bigint | number | null
    calculatedPrice: bigint | number
    roundedPrice: bigint | number
    priceChanged?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    product?: ProductCreateNestedOneWithoutInvoiceItemsInput
  }

  export type InvoiceItemUncheckedCreateWithoutInvoiceInput = {
    id?: number
    productId?: number | null
    productName: string
    unitType: $Enums.UnitType
    boxSize?: number | null
    quantity: number
    boxesCount?: number | null
    purchasePrice: bigint | number
    purchasePricePerUnit?: bigint | number | null
    calculatedPrice: bigint | number
    roundedPrice: bigint | number
    priceChanged?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvoiceItemCreateOrConnectWithoutInvoiceInput = {
    where: InvoiceItemWhereUniqueInput
    create: XOR<InvoiceItemCreateWithoutInvoiceInput, InvoiceItemUncheckedCreateWithoutInvoiceInput>
  }

  export type InvoiceItemCreateManyInvoiceInputEnvelope = {
    data: InvoiceItemCreateManyInvoiceInput | InvoiceItemCreateManyInvoiceInput[]
    skipDuplicates?: boolean
  }

  export type InvoicePhotoCreateWithoutInvoiceInput = {
    url: string
    processed?: boolean
    createdAt?: Date | string
    rawInvoiceItems?: RawInvoiceItemCreateNestedManyWithoutInvoicePhotoInput
  }

  export type InvoicePhotoUncheckedCreateWithoutInvoiceInput = {
    id?: number
    url: string
    processed?: boolean
    createdAt?: Date | string
    rawInvoiceItems?: RawInvoiceItemUncheckedCreateNestedManyWithoutInvoicePhotoInput
  }

  export type InvoicePhotoCreateOrConnectWithoutInvoiceInput = {
    where: InvoicePhotoWhereUniqueInput
    create: XOR<InvoicePhotoCreateWithoutInvoiceInput, InvoicePhotoUncheckedCreateWithoutInvoiceInput>
  }

  export type InvoicePhotoCreateManyInvoiceInputEnvelope = {
    data: InvoicePhotoCreateManyInvoiceInput | InvoicePhotoCreateManyInvoiceInput[]
    skipDuplicates?: boolean
  }

  export type AgentUpsertWithoutInvoicesInput = {
    update: XOR<AgentUpdateWithoutInvoicesInput, AgentUncheckedUpdateWithoutInvoicesInput>
    create: XOR<AgentCreateWithoutInvoicesInput, AgentUncheckedCreateWithoutInvoicesInput>
    where?: AgentWhereInput
  }

  export type AgentUpdateToOneWithWhereWithoutInvoicesInput = {
    where?: AgentWhereInput
    data: XOR<AgentUpdateWithoutInvoicesInput, AgentUncheckedUpdateWithoutInvoicesInput>
  }

  export type AgentUpdateWithoutInvoicesInput = {
    name?: StringFieldUpdateOperationsInput | string
    markupPercent?: IntFieldUpdateOperationsInput | number
    format?: NullableEnumAgentInvoiceFormatFieldUpdateOperationsInput | $Enums.AgentInvoiceFormat | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUpdateManyWithoutAgentNestedInput
    priceMemory?: ProductPriceMemoryUpdateManyWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateWithoutInvoicesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    markupPercent?: IntFieldUpdateOperationsInput | number
    format?: NullableEnumAgentInvoiceFormatFieldUpdateOperationsInput | $Enums.AgentInvoiceFormat | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUncheckedUpdateManyWithoutAgentNestedInput
    priceMemory?: ProductPriceMemoryUncheckedUpdateManyWithoutAgentNestedInput
  }

  export type InvoiceItemUpsertWithWhereUniqueWithoutInvoiceInput = {
    where: InvoiceItemWhereUniqueInput
    update: XOR<InvoiceItemUpdateWithoutInvoiceInput, InvoiceItemUncheckedUpdateWithoutInvoiceInput>
    create: XOR<InvoiceItemCreateWithoutInvoiceInput, InvoiceItemUncheckedCreateWithoutInvoiceInput>
  }

  export type InvoiceItemUpdateWithWhereUniqueWithoutInvoiceInput = {
    where: InvoiceItemWhereUniqueInput
    data: XOR<InvoiceItemUpdateWithoutInvoiceInput, InvoiceItemUncheckedUpdateWithoutInvoiceInput>
  }

  export type InvoiceItemUpdateManyWithWhereWithoutInvoiceInput = {
    where: InvoiceItemScalarWhereInput
    data: XOR<InvoiceItemUpdateManyMutationInput, InvoiceItemUncheckedUpdateManyWithoutInvoiceInput>
  }

  export type InvoicePhotoUpsertWithWhereUniqueWithoutInvoiceInput = {
    where: InvoicePhotoWhereUniqueInput
    update: XOR<InvoicePhotoUpdateWithoutInvoiceInput, InvoicePhotoUncheckedUpdateWithoutInvoiceInput>
    create: XOR<InvoicePhotoCreateWithoutInvoiceInput, InvoicePhotoUncheckedCreateWithoutInvoiceInput>
  }

  export type InvoicePhotoUpdateWithWhereUniqueWithoutInvoiceInput = {
    where: InvoicePhotoWhereUniqueInput
    data: XOR<InvoicePhotoUpdateWithoutInvoiceInput, InvoicePhotoUncheckedUpdateWithoutInvoiceInput>
  }

  export type InvoicePhotoUpdateManyWithWhereWithoutInvoiceInput = {
    where: InvoicePhotoScalarWhereInput
    data: XOR<InvoicePhotoUpdateManyMutationInput, InvoicePhotoUncheckedUpdateManyWithoutInvoiceInput>
  }

  export type InvoicePhotoScalarWhereInput = {
    AND?: InvoicePhotoScalarWhereInput | InvoicePhotoScalarWhereInput[]
    OR?: InvoicePhotoScalarWhereInput[]
    NOT?: InvoicePhotoScalarWhereInput | InvoicePhotoScalarWhereInput[]
    id?: IntFilter<"InvoicePhoto"> | number
    invoiceId?: IntFilter<"InvoicePhoto"> | number
    url?: StringFilter<"InvoicePhoto"> | string
    processed?: BoolFilter<"InvoicePhoto"> | boolean
    createdAt?: DateTimeFilter<"InvoicePhoto"> | Date | string
  }

  export type InvoiceCreateWithoutItemsInput = {
    type: $Enums.InvoiceType
    invoiceDate: Date | string
    markupPercent: number
    createdAt?: Date | string
    updatedAt?: Date | string
    agent: AgentCreateNestedOneWithoutInvoicesInput
    photos?: InvoicePhotoCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceUncheckedCreateWithoutItemsInput = {
    id?: number
    agentId: number
    type: $Enums.InvoiceType
    invoiceDate: Date | string
    markupPercent: number
    createdAt?: Date | string
    updatedAt?: Date | string
    photos?: InvoicePhotoUncheckedCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceCreateOrConnectWithoutItemsInput = {
    where: InvoiceWhereUniqueInput
    create: XOR<InvoiceCreateWithoutItemsInput, InvoiceUncheckedCreateWithoutItemsInput>
  }

  export type ProductCreateWithoutInvoiceItemsInput = {
    name: string
    category?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    agent?: AgentCreateNestedOneWithoutProductsInput
    priceMemory?: ProductPriceMemoryCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutInvoiceItemsInput = {
    id?: number
    name: string
    category?: string | null
    agentId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    priceMemory?: ProductPriceMemoryUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutInvoiceItemsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutInvoiceItemsInput, ProductUncheckedCreateWithoutInvoiceItemsInput>
  }

  export type InvoiceUpsertWithoutItemsInput = {
    update: XOR<InvoiceUpdateWithoutItemsInput, InvoiceUncheckedUpdateWithoutItemsInput>
    create: XOR<InvoiceCreateWithoutItemsInput, InvoiceUncheckedCreateWithoutItemsInput>
    where?: InvoiceWhereInput
  }

  export type InvoiceUpdateToOneWithWhereWithoutItemsInput = {
    where?: InvoiceWhereInput
    data: XOR<InvoiceUpdateWithoutItemsInput, InvoiceUncheckedUpdateWithoutItemsInput>
  }

  export type InvoiceUpdateWithoutItemsInput = {
    type?: EnumInvoiceTypeFieldUpdateOperationsInput | $Enums.InvoiceType
    invoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    markupPercent?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: AgentUpdateOneRequiredWithoutInvoicesNestedInput
    photos?: InvoicePhotoUpdateManyWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateWithoutItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    agentId?: IntFieldUpdateOperationsInput | number
    type?: EnumInvoiceTypeFieldUpdateOperationsInput | $Enums.InvoiceType
    invoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    markupPercent?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    photos?: InvoicePhotoUncheckedUpdateManyWithoutInvoiceNestedInput
  }

  export type ProductUpsertWithoutInvoiceItemsInput = {
    update: XOR<ProductUpdateWithoutInvoiceItemsInput, ProductUncheckedUpdateWithoutInvoiceItemsInput>
    create: XOR<ProductCreateWithoutInvoiceItemsInput, ProductUncheckedCreateWithoutInvoiceItemsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutInvoiceItemsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutInvoiceItemsInput, ProductUncheckedUpdateWithoutInvoiceItemsInput>
  }

  export type ProductUpdateWithoutInvoiceItemsInput = {
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: AgentUpdateOneWithoutProductsNestedInput
    priceMemory?: ProductPriceMemoryUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutInvoiceItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    agentId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    priceMemory?: ProductPriceMemoryUncheckedUpdateManyWithoutProductNestedInput
  }

  export type InvoicePhotoCreateWithoutRawInvoiceItemsInput = {
    url: string
    processed?: boolean
    createdAt?: Date | string
    invoice: InvoiceCreateNestedOneWithoutPhotosInput
  }

  export type InvoicePhotoUncheckedCreateWithoutRawInvoiceItemsInput = {
    id?: number
    invoiceId: number
    url: string
    processed?: boolean
    createdAt?: Date | string
  }

  export type InvoicePhotoCreateOrConnectWithoutRawInvoiceItemsInput = {
    where: InvoicePhotoWhereUniqueInput
    create: XOR<InvoicePhotoCreateWithoutRawInvoiceItemsInput, InvoicePhotoUncheckedCreateWithoutRawInvoiceItemsInput>
  }

  export type InvoicePhotoUpsertWithoutRawInvoiceItemsInput = {
    update: XOR<InvoicePhotoUpdateWithoutRawInvoiceItemsInput, InvoicePhotoUncheckedUpdateWithoutRawInvoiceItemsInput>
    create: XOR<InvoicePhotoCreateWithoutRawInvoiceItemsInput, InvoicePhotoUncheckedCreateWithoutRawInvoiceItemsInput>
    where?: InvoicePhotoWhereInput
  }

  export type InvoicePhotoUpdateToOneWithWhereWithoutRawInvoiceItemsInput = {
    where?: InvoicePhotoWhereInput
    data: XOR<InvoicePhotoUpdateWithoutRawInvoiceItemsInput, InvoicePhotoUncheckedUpdateWithoutRawInvoiceItemsInput>
  }

  export type InvoicePhotoUpdateWithoutRawInvoiceItemsInput = {
    url?: StringFieldUpdateOperationsInput | string
    processed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoice?: InvoiceUpdateOneRequiredWithoutPhotosNestedInput
  }

  export type InvoicePhotoUncheckedUpdateWithoutRawInvoiceItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    invoiceId?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    processed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateWithoutPriceMemoryInput = {
    name: string
    category?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    agent?: AgentCreateNestedOneWithoutProductsInput
    invoiceItems?: InvoiceItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutPriceMemoryInput = {
    id?: number
    name: string
    category?: string | null
    agentId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invoiceItems?: InvoiceItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutPriceMemoryInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutPriceMemoryInput, ProductUncheckedCreateWithoutPriceMemoryInput>
  }

  export type AgentCreateWithoutPriceMemoryInput = {
    name: string
    markupPercent: number
    format?: $Enums.AgentInvoiceFormat | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invoices?: InvoiceCreateNestedManyWithoutAgentInput
    products?: ProductCreateNestedManyWithoutAgentInput
  }

  export type AgentUncheckedCreateWithoutPriceMemoryInput = {
    id?: number
    name: string
    markupPercent: number
    format?: $Enums.AgentInvoiceFormat | null
    createdAt?: Date | string
    updatedAt?: Date | string
    invoices?: InvoiceUncheckedCreateNestedManyWithoutAgentInput
    products?: ProductUncheckedCreateNestedManyWithoutAgentInput
  }

  export type AgentCreateOrConnectWithoutPriceMemoryInput = {
    where: AgentWhereUniqueInput
    create: XOR<AgentCreateWithoutPriceMemoryInput, AgentUncheckedCreateWithoutPriceMemoryInput>
  }

  export type ProductUpsertWithoutPriceMemoryInput = {
    update: XOR<ProductUpdateWithoutPriceMemoryInput, ProductUncheckedUpdateWithoutPriceMemoryInput>
    create: XOR<ProductCreateWithoutPriceMemoryInput, ProductUncheckedCreateWithoutPriceMemoryInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutPriceMemoryInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutPriceMemoryInput, ProductUncheckedUpdateWithoutPriceMemoryInput>
  }

  export type ProductUpdateWithoutPriceMemoryInput = {
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: AgentUpdateOneWithoutProductsNestedInput
    invoiceItems?: InvoiceItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutPriceMemoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    agentId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoiceItems?: InvoiceItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type AgentUpsertWithoutPriceMemoryInput = {
    update: XOR<AgentUpdateWithoutPriceMemoryInput, AgentUncheckedUpdateWithoutPriceMemoryInput>
    create: XOR<AgentCreateWithoutPriceMemoryInput, AgentUncheckedCreateWithoutPriceMemoryInput>
    where?: AgentWhereInput
  }

  export type AgentUpdateToOneWithWhereWithoutPriceMemoryInput = {
    where?: AgentWhereInput
    data: XOR<AgentUpdateWithoutPriceMemoryInput, AgentUncheckedUpdateWithoutPriceMemoryInput>
  }

  export type AgentUpdateWithoutPriceMemoryInput = {
    name?: StringFieldUpdateOperationsInput | string
    markupPercent?: IntFieldUpdateOperationsInput | number
    format?: NullableEnumAgentInvoiceFormatFieldUpdateOperationsInput | $Enums.AgentInvoiceFormat | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoices?: InvoiceUpdateManyWithoutAgentNestedInput
    products?: ProductUpdateManyWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateWithoutPriceMemoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    markupPercent?: IntFieldUpdateOperationsInput | number
    format?: NullableEnumAgentInvoiceFormatFieldUpdateOperationsInput | $Enums.AgentInvoiceFormat | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoices?: InvoiceUncheckedUpdateManyWithoutAgentNestedInput
    products?: ProductUncheckedUpdateManyWithoutAgentNestedInput
  }

  export type InvoiceCreateWithoutPhotosInput = {
    type: $Enums.InvoiceType
    invoiceDate: Date | string
    markupPercent: number
    createdAt?: Date | string
    updatedAt?: Date | string
    agent: AgentCreateNestedOneWithoutInvoicesInput
    items?: InvoiceItemCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceUncheckedCreateWithoutPhotosInput = {
    id?: number
    agentId: number
    type: $Enums.InvoiceType
    invoiceDate: Date | string
    markupPercent: number
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: InvoiceItemUncheckedCreateNestedManyWithoutInvoiceInput
  }

  export type InvoiceCreateOrConnectWithoutPhotosInput = {
    where: InvoiceWhereUniqueInput
    create: XOR<InvoiceCreateWithoutPhotosInput, InvoiceUncheckedCreateWithoutPhotosInput>
  }

  export type RawInvoiceItemCreateWithoutInvoicePhotoInput = {
    rowIndex: number
    description: string
    rawQuantity?: string | null
    rawUnitPrice?: string | null
    rawAmount?: string | null
    createdAt?: Date | string
  }

  export type RawInvoiceItemUncheckedCreateWithoutInvoicePhotoInput = {
    id?: number
    rowIndex: number
    description: string
    rawQuantity?: string | null
    rawUnitPrice?: string | null
    rawAmount?: string | null
    createdAt?: Date | string
  }

  export type RawInvoiceItemCreateOrConnectWithoutInvoicePhotoInput = {
    where: RawInvoiceItemWhereUniqueInput
    create: XOR<RawInvoiceItemCreateWithoutInvoicePhotoInput, RawInvoiceItemUncheckedCreateWithoutInvoicePhotoInput>
  }

  export type RawInvoiceItemCreateManyInvoicePhotoInputEnvelope = {
    data: RawInvoiceItemCreateManyInvoicePhotoInput | RawInvoiceItemCreateManyInvoicePhotoInput[]
    skipDuplicates?: boolean
  }

  export type InvoiceUpsertWithoutPhotosInput = {
    update: XOR<InvoiceUpdateWithoutPhotosInput, InvoiceUncheckedUpdateWithoutPhotosInput>
    create: XOR<InvoiceCreateWithoutPhotosInput, InvoiceUncheckedCreateWithoutPhotosInput>
    where?: InvoiceWhereInput
  }

  export type InvoiceUpdateToOneWithWhereWithoutPhotosInput = {
    where?: InvoiceWhereInput
    data: XOR<InvoiceUpdateWithoutPhotosInput, InvoiceUncheckedUpdateWithoutPhotosInput>
  }

  export type InvoiceUpdateWithoutPhotosInput = {
    type?: EnumInvoiceTypeFieldUpdateOperationsInput | $Enums.InvoiceType
    invoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    markupPercent?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: AgentUpdateOneRequiredWithoutInvoicesNestedInput
    items?: InvoiceItemUpdateManyWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateWithoutPhotosInput = {
    id?: IntFieldUpdateOperationsInput | number
    agentId?: IntFieldUpdateOperationsInput | number
    type?: EnumInvoiceTypeFieldUpdateOperationsInput | $Enums.InvoiceType
    invoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    markupPercent?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: InvoiceItemUncheckedUpdateManyWithoutInvoiceNestedInput
  }

  export type RawInvoiceItemUpsertWithWhereUniqueWithoutInvoicePhotoInput = {
    where: RawInvoiceItemWhereUniqueInput
    update: XOR<RawInvoiceItemUpdateWithoutInvoicePhotoInput, RawInvoiceItemUncheckedUpdateWithoutInvoicePhotoInput>
    create: XOR<RawInvoiceItemCreateWithoutInvoicePhotoInput, RawInvoiceItemUncheckedCreateWithoutInvoicePhotoInput>
  }

  export type RawInvoiceItemUpdateWithWhereUniqueWithoutInvoicePhotoInput = {
    where: RawInvoiceItemWhereUniqueInput
    data: XOR<RawInvoiceItemUpdateWithoutInvoicePhotoInput, RawInvoiceItemUncheckedUpdateWithoutInvoicePhotoInput>
  }

  export type RawInvoiceItemUpdateManyWithWhereWithoutInvoicePhotoInput = {
    where: RawInvoiceItemScalarWhereInput
    data: XOR<RawInvoiceItemUpdateManyMutationInput, RawInvoiceItemUncheckedUpdateManyWithoutInvoicePhotoInput>
  }

  export type RawInvoiceItemScalarWhereInput = {
    AND?: RawInvoiceItemScalarWhereInput | RawInvoiceItemScalarWhereInput[]
    OR?: RawInvoiceItemScalarWhereInput[]
    NOT?: RawInvoiceItemScalarWhereInput | RawInvoiceItemScalarWhereInput[]
    id?: IntFilter<"RawInvoiceItem"> | number
    invoicePhotoId?: IntFilter<"RawInvoiceItem"> | number
    rowIndex?: IntFilter<"RawInvoiceItem"> | number
    description?: StringFilter<"RawInvoiceItem"> | string
    rawQuantity?: StringNullableFilter<"RawInvoiceItem"> | string | null
    rawUnitPrice?: StringNullableFilter<"RawInvoiceItem"> | string | null
    rawAmount?: StringNullableFilter<"RawInvoiceItem"> | string | null
    createdAt?: DateTimeFilter<"RawInvoiceItem"> | Date | string
  }

  export type InvoiceCreateManyAgentInput = {
    id?: number
    type: $Enums.InvoiceType
    invoiceDate: Date | string
    markupPercent: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductCreateManyAgentInput = {
    id?: number
    name: string
    category?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductPriceMemoryCreateManyAgentInput = {
    id?: number
    productId: number
    purchasePrice: bigint | number
    salePrice: bigint | number
    source: $Enums.PriceSource
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvoiceUpdateWithoutAgentInput = {
    type?: EnumInvoiceTypeFieldUpdateOperationsInput | $Enums.InvoiceType
    invoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    markupPercent?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: InvoiceItemUpdateManyWithoutInvoiceNestedInput
    photos?: InvoicePhotoUpdateManyWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateWithoutAgentInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: EnumInvoiceTypeFieldUpdateOperationsInput | $Enums.InvoiceType
    invoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    markupPercent?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: InvoiceItemUncheckedUpdateManyWithoutInvoiceNestedInput
    photos?: InvoicePhotoUncheckedUpdateManyWithoutInvoiceNestedInput
  }

  export type InvoiceUncheckedUpdateManyWithoutAgentInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: EnumInvoiceTypeFieldUpdateOperationsInput | $Enums.InvoiceType
    invoiceDate?: DateTimeFieldUpdateOperationsInput | Date | string
    markupPercent?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUpdateWithoutAgentInput = {
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoiceItems?: InvoiceItemUpdateManyWithoutProductNestedInput
    priceMemory?: ProductPriceMemoryUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutAgentInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoiceItems?: InvoiceItemUncheckedUpdateManyWithoutProductNestedInput
    priceMemory?: ProductPriceMemoryUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutAgentInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductPriceMemoryUpdateWithoutAgentInput = {
    purchasePrice?: BigIntFieldUpdateOperationsInput | bigint | number
    salePrice?: BigIntFieldUpdateOperationsInput | bigint | number
    source?: EnumPriceSourceFieldUpdateOperationsInput | $Enums.PriceSource
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutPriceMemoryNestedInput
  }

  export type ProductPriceMemoryUncheckedUpdateWithoutAgentInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    purchasePrice?: BigIntFieldUpdateOperationsInput | bigint | number
    salePrice?: BigIntFieldUpdateOperationsInput | bigint | number
    source?: EnumPriceSourceFieldUpdateOperationsInput | $Enums.PriceSource
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductPriceMemoryUncheckedUpdateManyWithoutAgentInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    purchasePrice?: BigIntFieldUpdateOperationsInput | bigint | number
    salePrice?: BigIntFieldUpdateOperationsInput | bigint | number
    source?: EnumPriceSourceFieldUpdateOperationsInput | $Enums.PriceSource
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceItemCreateManyProductInput = {
    id?: number
    invoiceId: number
    productName: string
    unitType: $Enums.UnitType
    boxSize?: number | null
    quantity: number
    boxesCount?: number | null
    purchasePrice: bigint | number
    purchasePricePerUnit?: bigint | number | null
    calculatedPrice: bigint | number
    roundedPrice: bigint | number
    priceChanged?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductPriceMemoryCreateManyProductInput = {
    id?: number
    agentId: number
    purchasePrice: bigint | number
    salePrice: bigint | number
    source: $Enums.PriceSource
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvoiceItemUpdateWithoutProductInput = {
    productName?: StringFieldUpdateOperationsInput | string
    unitType?: EnumUnitTypeFieldUpdateOperationsInput | $Enums.UnitType
    boxSize?: NullableIntFieldUpdateOperationsInput | number | null
    quantity?: IntFieldUpdateOperationsInput | number
    boxesCount?: NullableIntFieldUpdateOperationsInput | number | null
    purchasePrice?: BigIntFieldUpdateOperationsInput | bigint | number
    purchasePricePerUnit?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    calculatedPrice?: BigIntFieldUpdateOperationsInput | bigint | number
    roundedPrice?: BigIntFieldUpdateOperationsInput | bigint | number
    priceChanged?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    invoice?: InvoiceUpdateOneRequiredWithoutItemsNestedInput
  }

  export type InvoiceItemUncheckedUpdateWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    invoiceId?: IntFieldUpdateOperationsInput | number
    productName?: StringFieldUpdateOperationsInput | string
    unitType?: EnumUnitTypeFieldUpdateOperationsInput | $Enums.UnitType
    boxSize?: NullableIntFieldUpdateOperationsInput | number | null
    quantity?: IntFieldUpdateOperationsInput | number
    boxesCount?: NullableIntFieldUpdateOperationsInput | number | null
    purchasePrice?: BigIntFieldUpdateOperationsInput | bigint | number
    purchasePricePerUnit?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    calculatedPrice?: BigIntFieldUpdateOperationsInput | bigint | number
    roundedPrice?: BigIntFieldUpdateOperationsInput | bigint | number
    priceChanged?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceItemUncheckedUpdateManyWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    invoiceId?: IntFieldUpdateOperationsInput | number
    productName?: StringFieldUpdateOperationsInput | string
    unitType?: EnumUnitTypeFieldUpdateOperationsInput | $Enums.UnitType
    boxSize?: NullableIntFieldUpdateOperationsInput | number | null
    quantity?: IntFieldUpdateOperationsInput | number
    boxesCount?: NullableIntFieldUpdateOperationsInput | number | null
    purchasePrice?: BigIntFieldUpdateOperationsInput | bigint | number
    purchasePricePerUnit?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    calculatedPrice?: BigIntFieldUpdateOperationsInput | bigint | number
    roundedPrice?: BigIntFieldUpdateOperationsInput | bigint | number
    priceChanged?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductPriceMemoryUpdateWithoutProductInput = {
    purchasePrice?: BigIntFieldUpdateOperationsInput | bigint | number
    salePrice?: BigIntFieldUpdateOperationsInput | bigint | number
    source?: EnumPriceSourceFieldUpdateOperationsInput | $Enums.PriceSource
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: AgentUpdateOneRequiredWithoutPriceMemoryNestedInput
  }

  export type ProductPriceMemoryUncheckedUpdateWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    agentId?: IntFieldUpdateOperationsInput | number
    purchasePrice?: BigIntFieldUpdateOperationsInput | bigint | number
    salePrice?: BigIntFieldUpdateOperationsInput | bigint | number
    source?: EnumPriceSourceFieldUpdateOperationsInput | $Enums.PriceSource
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductPriceMemoryUncheckedUpdateManyWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    agentId?: IntFieldUpdateOperationsInput | number
    purchasePrice?: BigIntFieldUpdateOperationsInput | bigint | number
    salePrice?: BigIntFieldUpdateOperationsInput | bigint | number
    source?: EnumPriceSourceFieldUpdateOperationsInput | $Enums.PriceSource
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceItemCreateManyInvoiceInput = {
    id?: number
    productId?: number | null
    productName: string
    unitType: $Enums.UnitType
    boxSize?: number | null
    quantity: number
    boxesCount?: number | null
    purchasePrice: bigint | number
    purchasePricePerUnit?: bigint | number | null
    calculatedPrice: bigint | number
    roundedPrice: bigint | number
    priceChanged?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InvoicePhotoCreateManyInvoiceInput = {
    id?: number
    url: string
    processed?: boolean
    createdAt?: Date | string
  }

  export type InvoiceItemUpdateWithoutInvoiceInput = {
    productName?: StringFieldUpdateOperationsInput | string
    unitType?: EnumUnitTypeFieldUpdateOperationsInput | $Enums.UnitType
    boxSize?: NullableIntFieldUpdateOperationsInput | number | null
    quantity?: IntFieldUpdateOperationsInput | number
    boxesCount?: NullableIntFieldUpdateOperationsInput | number | null
    purchasePrice?: BigIntFieldUpdateOperationsInput | bigint | number
    purchasePricePerUnit?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    calculatedPrice?: BigIntFieldUpdateOperationsInput | bigint | number
    roundedPrice?: BigIntFieldUpdateOperationsInput | bigint | number
    priceChanged?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneWithoutInvoiceItemsNestedInput
  }

  export type InvoiceItemUncheckedUpdateWithoutInvoiceInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: NullableIntFieldUpdateOperationsInput | number | null
    productName?: StringFieldUpdateOperationsInput | string
    unitType?: EnumUnitTypeFieldUpdateOperationsInput | $Enums.UnitType
    boxSize?: NullableIntFieldUpdateOperationsInput | number | null
    quantity?: IntFieldUpdateOperationsInput | number
    boxesCount?: NullableIntFieldUpdateOperationsInput | number | null
    purchasePrice?: BigIntFieldUpdateOperationsInput | bigint | number
    purchasePricePerUnit?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    calculatedPrice?: BigIntFieldUpdateOperationsInput | bigint | number
    roundedPrice?: BigIntFieldUpdateOperationsInput | bigint | number
    priceChanged?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoiceItemUncheckedUpdateManyWithoutInvoiceInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: NullableIntFieldUpdateOperationsInput | number | null
    productName?: StringFieldUpdateOperationsInput | string
    unitType?: EnumUnitTypeFieldUpdateOperationsInput | $Enums.UnitType
    boxSize?: NullableIntFieldUpdateOperationsInput | number | null
    quantity?: IntFieldUpdateOperationsInput | number
    boxesCount?: NullableIntFieldUpdateOperationsInput | number | null
    purchasePrice?: BigIntFieldUpdateOperationsInput | bigint | number
    purchasePricePerUnit?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    calculatedPrice?: BigIntFieldUpdateOperationsInput | bigint | number
    roundedPrice?: BigIntFieldUpdateOperationsInput | bigint | number
    priceChanged?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InvoicePhotoUpdateWithoutInvoiceInput = {
    url?: StringFieldUpdateOperationsInput | string
    processed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rawInvoiceItems?: RawInvoiceItemUpdateManyWithoutInvoicePhotoNestedInput
  }

  export type InvoicePhotoUncheckedUpdateWithoutInvoiceInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    processed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rawInvoiceItems?: RawInvoiceItemUncheckedUpdateManyWithoutInvoicePhotoNestedInput
  }

  export type InvoicePhotoUncheckedUpdateManyWithoutInvoiceInput = {
    id?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    processed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RawInvoiceItemCreateManyInvoicePhotoInput = {
    id?: number
    rowIndex: number
    description: string
    rawQuantity?: string | null
    rawUnitPrice?: string | null
    rawAmount?: string | null
    createdAt?: Date | string
  }

  export type RawInvoiceItemUpdateWithoutInvoicePhotoInput = {
    rowIndex?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    rawQuantity?: NullableStringFieldUpdateOperationsInput | string | null
    rawUnitPrice?: NullableStringFieldUpdateOperationsInput | string | null
    rawAmount?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RawInvoiceItemUncheckedUpdateWithoutInvoicePhotoInput = {
    id?: IntFieldUpdateOperationsInput | number
    rowIndex?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    rawQuantity?: NullableStringFieldUpdateOperationsInput | string | null
    rawUnitPrice?: NullableStringFieldUpdateOperationsInput | string | null
    rawAmount?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RawInvoiceItemUncheckedUpdateManyWithoutInvoicePhotoInput = {
    id?: IntFieldUpdateOperationsInput | number
    rowIndex?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    rawQuantity?: NullableStringFieldUpdateOperationsInput | string | null
    rawUnitPrice?: NullableStringFieldUpdateOperationsInput | string | null
    rawAmount?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}