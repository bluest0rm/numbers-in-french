export const MAX_NUMBER_CONVERTED = 999999

/**
 * A singleton class with a public static function "convert"
 * that converts a given number into a string of the equivalent number written in French
 * or "not-supported" if the number is greater than the max number supported
 */
export class NumbersInFrench {
    private static instance: NumbersInFrench | undefined
    private conversions: string[] = new Array(MAX_NUMBER_CONVERTED)

    private constructor() { }

    static convert(number: number): string | undefined {
        if (!this.instance) {
            this.instance = new NumbersInFrench()
            this.instance.convertAllNumbersInFrench()
        }
        if (typeof number !== "number" || number > MAX_NUMBER_CONVERTED) return undefined
        return this.instance.conversions[number]
    }

    private convertAllNumbersInFrench() {
        this.conversions = new Array(MAX_NUMBER_CONVERTED)
        this.convertNumbersUpTo19()
        this.convertTens()
        this.convertNumbersUpTo69()
        this.convertNumbersFrom71To79()
        this.convertNumbersFrom81To99()
        this.convertHundreds()
        this.convertNumbersFrom101To999()
        this.convertThousands()
        this.convertNumbersFrom1001()
    }

    private convertNumbersUpTo19() {
        this.conversions[0] = "zéro"
        this.conversions[1] = "un"
        this.conversions[2] = "deux"
        this.conversions[3] = "trois"
        this.conversions[4] = "quatre"
        this.conversions[5] = "cinq"
        this.conversions[6] = "six"
        this.conversions[7] = "sept"
        this.conversions[8] = "huit"
        this.conversions[9] = "neuf"
        this.conversions[10] = "dix"
        this.conversions[11] = "onze"
        this.conversions[12] = "douze"
        this.conversions[13] = "treize"
        this.conversions[14] = "quatorze"
        this.conversions[15] = "quinze"
        this.conversions[16] = "seize"
        this.conversions[17] = "dix-sept"
        this.conversions[18] = "dix-huit"
        this.conversions[19] = "dix-neuf"
    }

    private convertTens() {
        this.conversions[20] = "vingt"
        this.conversions[30] = "trente"
        this.conversions[40] = "quarante"
        this.conversions[50] = "cinquante"
        this.conversions[60] = "soixante"
        this.conversions[70] = "soixante-dix"
        this.conversions[80] = "quatre-vingts"
        this.conversions[90] = "quatre-vingt-dix"
    }


    private convertNumbersUpTo69() {
        for (let ten = 2; ten <= 6; ten++) {
            for (let unit = 1; unit <= 9; unit++) {
                const numberToConvert = ten * 10 + unit;
                if (unit === 1) {
                    this.conversions[numberToConvert] = this.conversions[ten * 10] + "-et-un"
                } else {
                    this.conversions[numberToConvert] = this.conversions[ten * 10] + "-" + this.conversions[unit]
                }
            }
        }
    }

    private convertNumbersFrom71To79() {
        this.conversions[71] = "soixante-et-onze"
        for (let unit = 2; unit <= 9; unit++) {
            const numberToConvert = 7 * 10 + unit;
            this.conversions[numberToConvert] = "soixante-" + this.conversions[10 + unit]
        }
    }

    private convertNumbersFrom81To99() {
        for (let unit = 1; unit <= 19; unit++) {
            const numberToConvert = 8 * 10 + unit;
            this.conversions[numberToConvert] = "quatre-vingt-" + this.conversions[unit]
        }
    }

    private convertHundreds() {
        this.conversions[100] = "cent"
        for (let hundred = 2; hundred <= 9; hundred++) {
            const numberToConvert = hundred * 100;
            this.conversions[numberToConvert] = this.conversions[hundred] + "-cents"
        }
    }

    private convertNumbersFrom101To999() {
        for (let numberToConvert = 101; numberToConvert <= 999; numberToConvert++) {
            // Since hundreds have already been converted, we can skip them
            if (numberToConvert % 100 === 0) continue

            const hundred = Math.floor(numberToConvert / 100);
            const rest = numberToConvert % 100;

            if (hundred === 1) {
                this.conversions[numberToConvert] = "cent-" + this.conversions[rest]
            } else {
                this.conversions[numberToConvert] = this.conversions[hundred] + "-cent-" + this.conversions[rest]
            }
        }
    }

    private convertThousands() {
        this.conversions[1000] = "mille"
        for (let thousand = 2; thousand <= 999; thousand++) {
            const numberToConvert = thousand * 1000;
            this.conversions[numberToConvert] = this.conversions[thousand] + "-milles"
        }
    }

    private convertNumbersFrom1001() {
        for (let numberToConvert = 1001; numberToConvert <= 999999; numberToConvert++) {
            // Since thousands have already been converted, we can skip them
            if (numberToConvert % 1000 === 0) continue

            const thousand = Math.floor(numberToConvert / 1000);
            const rest = numberToConvert % 1000;

            if (thousand === 1) {
                this.conversions[numberToConvert] = "mille-" + this.conversions[rest]
            } else {
                this.conversions[numberToConvert] = this.conversions[thousand] + "-mille-" + this.conversions[rest]
            }
        }
    }
}