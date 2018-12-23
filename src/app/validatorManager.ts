// nicer validator
export class ValidatorManager {
    private readonly valList: Validator[];
    private readonly regexNumber = new RegExp(/^[0-9]+$/);

    constructor() {
        this.valList = [];
    }

    public hasError(validatorName: string, errorType: ValidatorEnum): boolean {
        const val = this.get(validatorName);
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
        const value = event.target['value'];
        if (validator.hasErrorInList(ValidatorEnum.number)) {
            if (this.regexNumber.test(value)) {
                validator.content = value;
            } else {
                if (value.toString().length === 0) {
                    validator.content = value;
                } else {
                    event.target['value'] = validator.content;
                }

            }
        } else {
            validator.content = event.target['value'];
        }
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
    private readonly errorList: ValidatorEnum[];
    name: string;
    content: string;


    constructor(activateError: ValidatorEnum[], validatorName: string) {
        this.errorList = activateError;
        this.content = '';
        if (validatorName.length === 0) {
            throw new Error('Validator needs a name');
        }
        this.name = validatorName;
    }

    hasErrorInList(errorToSearch: ValidatorEnum): boolean {
        for (const item of this.errorList) {
            console.log(item.toString());
            if (item === errorToSearch) {
                return true;
            }
        }
        return false;
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
    // @ts-ignore
    email = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
    // @ts-ignore
    number = new RegExp(/^[0-9]+$/),
    // @ts-ignore
    empty = new RegExp(/^$/)
}
