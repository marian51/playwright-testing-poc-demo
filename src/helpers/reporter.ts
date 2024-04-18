import type { FullConfig, FullResult, Reporter, Suite, TestCase, TestResult } from '@playwright/test/reporter'

class CustomReporter implements Reporter {
    constructor(options: { customOption?: string } = {}) {
        console.log(`some text ${options.customOption}`)
    }

    onBegin(config: FullConfig<{}, {}>, suite: Suite): void {
        console.log(`${new Date().toLocaleString()} - Starting the run with ${suite.allTests().length} tests`)
    }

    onTestBegin(test: TestCase, result: TestResult): void {
        console.log(`${new Date().toLocaleString()} - Starting test: ${test.title}`)
    }

    onTestEnd(test: TestCase, result: TestResult): void {
        console.log(`${new Date().toLocaleString()} - Finished test: ${test.title}, the result is: ${result.status}`)
    }

    onEnd(result: FullResult): void | Promise<void | { status?: 'passed' | 'failed' | 'timedout' | 'interrupted' | undefined; } | undefined> {
        console.log(`${new Date().toLocaleString()} - Finished the run: ${result.status}`)
    }

    public static logAction(message: string) {
        console.log(`${new Date().toLocaleString()} - ${message}`)
    }

    onStdOut(chunk: string | Buffer, test: void | TestCase, result: void | TestResult): void {
        console.log(chunk.toString().replace("\n",""))
    }
}

export default CustomReporter