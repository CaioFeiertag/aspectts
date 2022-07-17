export function createBasicClass() {
	class BasicClass {
		public method() {
			return "BasicClass.method";
		}
	}
	return BasicClass;
}

export function createClassWithDifferentProperties() {
	class ClassWithDifferentProperties {
		method() {}
		static staticMethod() {}
		get name() {
			return "";
		}
		set name(value: string) {}
	}
	return ClassWithDifferentProperties;
}
