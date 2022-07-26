# `@caiofeiertag/aspectts`

## Usage

```javascript
import AspectTS, {
	IAspect,
	IMetadata,
	IPointcuts,
} from "@caiofeiertag/aspectts";

class LogAspect implements IAspect {
	pointcuts: IPointcuts = {
		joinpointType: "MethodCall",
		className: [],
		methodOrProperty: [],
	};
	before(metadata: IMetadata): void {
		console.log(
			`Chamou '${metadata.methodName}' da '${metadata.className}' com: ${metadata.arguments}`
		);
	}
	after(metadata: IMetadata): void {
		console.log(
			`Retornou ${metadata.result} após chamar '${metadata.methodName}' da '${metadata.className}'`
		);
	}
}

class Math {
	add(a: number, b: number): number {
		return a + b;
	}
	divide(a: number, b: number): number {
		if (b === 0) {
			throw new Error("Erro ao tentar dividir por zero");
		}
		return a / b;
	}
}

AspectTS.registerAspects([new LogAspect()]);
AspectTS.registerTargets([Math]);

const math = new Math();
math.add(1, 1);
math.divide(2, 1);

// Result:
// Chamou 'add' da 'Math' com: 1,1
// Retornou 2 após chamar 'add' da 'Math'
// Chamou 'divide' da 'Math' com: 2,1
// Retornou 2 após chamar 'divide' da 'Math'
```
