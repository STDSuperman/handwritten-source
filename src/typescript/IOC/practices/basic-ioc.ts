import 'reflect-metadata';

// 初识注入

type Constructor<T = any> = new (...args: any[]) => T;

const Injectable = (): ClassDecorator => target => {};

class OtherService {
  a = 1;
  say() {
    console.log(this.a)
  }
}

@Injectable()
class Practice2 {
  constructor(
    public otherService: OtherService
  ) {}

  call() {
    this.otherService.say();
  }
}

const factory = <T>(target: Constructor<T>): T => {
  const providers = Reflect.getMetadata('design:paramtypes', target);
  const args = providers.map((provider: Constructor) => new provider());
  return new target(...args)
}

const test1 = factory(Practice2);
test1.call()