import 'reflect-metadata';


const Prop = (prefix: string) => {
  return (...args: any[]) => {
    const [target, key] = args;
    const typeInfo = Reflect.getMetadata('design:type', target, key)
    console.log(`${key} type: ${typeInfo.name}`);
  }
}

@Reflect.metadata('AClass', 'Practice1')
class Practice1 {
  @Reflect.metadata('attr', 'name')
  public name = 'Practice1'

  @Prop('password')
  public password: string = 'password';

  @Reflect.metadata('method', 'getName')
  public getName() { return this.name }

  @Prop('/')
  public getUserName(key: string) {
    console.log(key);
  }
}

// console.log(Reflect.getMetadata('AClass', Practice1));
// console.log(Reflect.getMetadata('method', new Practice1(), 'getName'))