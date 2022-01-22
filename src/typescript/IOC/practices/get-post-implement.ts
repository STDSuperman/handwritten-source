import 'reflect-metadata';

const PATH_METADATA = Symbol('path');
const METHOD_METADATA = Symbol('method');

const Controller = (path: string): ClassDecorator => {
  return (target: any) => {
    Reflect.defineMetadata(PATH_METADATA, path, target);
  }
}

const createMappingDecorator = (methodName: string) => (path: string): MethodDecorator => {
  return (target: any, key: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
    Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);
    Reflect.defineMetadata(METHOD_METADATA, methodName, descriptor.value);
  }
}

const GET = createMappingDecorator('GET');
const POST = createMappingDecorator('POST');

@Controller('/root')
class RootController {

  @GET('/get_name')
  public getName() {
    return 'yoy'
  }

  @POST('/send_msg')
  public sendMsg() {
    return 'hello world'
  }
}

const isConstructor = (fcName: string): boolean => {
  return fcName === 'constructor';
}

const isFunction = (target: unknown): boolean => {
  return typeof target === 'function';
}

const mapRoute = (instance: RootController) => {
  const prototype = Object.getPrototypeOf(instance);
  const methods = Object.getOwnPropertyNames(prototype)
    .filter(name => !isConstructor(name) && isFunction(prototype[name]));

  const rootPath = Reflect.getMetadata(PATH_METADATA, prototype.constructor);

  return methods.map(methodName => {
    const fc = prototype[methodName];
    const methodType = Reflect.getMetadata(METHOD_METADATA, fc);
    const path = Reflect.getMetadata(PATH_METADATA, fc);

    return {
      rootPath,
      fc,
      method: methodType,
      methodName,
      path
    }
  })
}

const ins = new RootController();

console.log(mapRoute(ins))