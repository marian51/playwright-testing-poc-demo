import type { FullConfig, FullResult, Reporter, Suite, TestCase, TestResult } from '@playwright/test/reporter'

class CustomReporter implements Reporter {
    readonly RED = '\x1b[31m'
    readonly GREEN = '\x1b[32m'
    readonly YELLOW = '\x1b[33m'
    readonly BLUE = '\x1b[34m'
    readonly RESET = '\x1b[0m'

    constructor(options: { customOption?: string } = {}) {
        console.log(`some text ${options.customOption}`)
    }

    onBegin(config: FullConfig<{}, {}>, suite: Suite): void {
        console.log(`${new Date().toLocaleString()} - ${this.YELLOW}Starting the run with ${suite.allTests().length} tests${this.RESET}`)
    }

    onTestBegin(test: TestCase, result: TestResult): void {
        console.log(`${new Date().toLocaleString()} - ${this.YELLOW}Starting test: ${test.title}${this.RESET}`)
    }

    onTestEnd(test: TestCase, result: TestResult): void {
        const resultColor = result.status === 'passed' ? this.GREEN : result.status === 'failed' ? this.RED : this.YELLOW
        console.log(`${new Date().toLocaleString()} - ${this.YELLOW}Finished test: ${test.title}, the result is: ${resultColor}${result.status}${this.RESET}`)
    }

    onEnd(result: FullResult): void | Promise<void | { status?: 'passed' | 'failed' | 'timedout' | 'interrupted' | undefined; } | undefined> {
        const resultColor = result.status === 'passed' ? this.GREEN : result.status === 'failed' ? this.RED : this.YELLOW
        console.log(`${new Date().toLocaleString()} - ${this.YELLOW}Finished the run: ${resultColor}${result.status}${this.RESET}`)
    }

    public static logAction(message: string) {
        console.log(`${new Date().toLocaleString()} - ${message}`)
    }

    onStdOut(chunk: string | Buffer, test: void | TestCase, result: void | TestResult): void {
        console.log(chunk.toString().replace("\n",""))
    }
}

export default CustomReporter