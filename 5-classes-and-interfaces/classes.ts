abstract class Department {
  static fiscalYear = 2020;
  protected employees: string[] = [];

  constructor(protected readonly id: string, public name: string) {}

  abstract describe(this: Department): void;
  //console.log("Department: " + this.id + " " + this.name);

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }

  static createEmployee(name: string) {
    return { name: name };
  }
}

class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, "IT");
    this.admins = admins;
  }

  describe(): void {
    console.log("IT Department - ID: " + this.id);
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report found.");
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("Please pass in a valid value!");
    }
    this.addReport(value);
  }

  describe(): void {
    console.log("Accounting Department - ID: " + this.id);
  }

  private constructor(
    id: string,
    private reports: string[],
    lastReport: string
  ) {
    super(id, "Accounting");
    this.lastReport = lastReport;
  }

  static getInstance() {
    if (AccountingDepartment.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment("d2", [], "Last report");
    return this.instance;
  }

  addEmployee(employee: string): void {
    if (employee === "Max") {
      return;
    }
    this.employees.push(employee);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }
}

//new Department("d1", "Accounting").describe();

const employee1 = Department.createEmployee("Max");
console.log(employee1, Department.fiscalYear);

const it = new ITDepartment("d1", ["Max"]);

it.addEmployee("Max");
it.addEmployee("Manu");

//it.employees[2] = "Anna";

it.describe();
it.printEmployeeInformation();

//const accountingCopy = { name: "DUMMY", describe: accounting.describe };
//accountingCopy.describe();

console.log(it);

const accounting = new AccountingDepartment("d2", [], "Last report");

console.log(accounting.mostRecentReport);

accounting.mostRecentReport = "New report";
accounting.addReport("Something went wrong...");

accounting.addEmployee("Max");
accounting.addEmployee("Manu");

accounting.printEmployeeInformation();

accounting.printReports();

accounting.describe();
