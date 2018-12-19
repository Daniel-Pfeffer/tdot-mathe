// nicer validator
export class ValidatorManager {
    private readonly valList: Validator[];

    constructor() {
        this.valList = [];
    }

    public hasError(validatorName: string, errorType: ValidatorEnum): boolean {
        const val = this.get(validatorName);
        console.log(`${val.name} with ${errorType}: ${val.hasError(errorType)}`);
        return val.hasError(errorType);
    }

    public add(errors: ValidatorEnum[], validatorName: string) {
        const newElement: Validator = new Validator(errors, validatorName);
        if (this.get(newElement.name) === null || this.get(newElement.name) === undefined) {
            this.valList.push(newElement);
        } else {
            throw new Error('Names of validators must be single time use');
        }
    }

    public changeContent(validatorName: string, event: Event) {
        const validator = this.get(validatorName);
        validator.content = event.target['value'];
    }

    public get(validatorName: String) {
        for (const item of this.valList) {
            if (item.name === validatorName) {
                return item;
            }
        }
    }
}

class Validator {
    private errorList: ValidatorEnum[];
    name: string;
    content: string;


    constructor(activateError: ValidatorEnum[], validatorName: string) {
        this.errorList = activateError;
        if (validatorName.length === 0) {
            throw new Error('Validator needs a name');
        }
        this.name = validatorName;
    }

    hasError(error: ValidatorEnum): boolean {
        if (this.errorList.includes(error)) {
            if (error !== ValidatorEnum.empty) {
                const errorString = new RegExp(error.toString().slice(1, error.toString().length - 1));
                return !errorString.test(this.content);
            } else {
                if (this.content !== undefined) {
                    return this.content.length === 0;
                } else {
                    return true;
                }
            }
        } else {
            throw new Error('Error isn\'t declared in the validator');
        }
    }
}

/*
    Master of suppression
 */
export enum ValidatorEnum {
    // @ts-ignore^
    empty = 'empty',
    // @ts-ignore
    email = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
    // @ts-ignore
    number = new RegExp(/^[0-9]+$/)
}
