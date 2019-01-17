const childProcess = require('child_process');

class Liquibase {
	constructor(params = {}) {
		const defaultParams = {
            changeLogFile:'./module/liquibase/changeLog.xml',
			liquibase:'./module/liquibase/lib/liquibase-core-3.5.3.jar',
			driver: 'org.postgresql.Driver',
			classpath: './module/liquibase/lib/postgresql-42.2.5.jar'
		};
		this.params = Object.assign({}, defaultParams, params);
	}

	get command() {
		let cmd = `java -jar ${this.params.liquibase}`;
		Object.keys(this.params).forEach(key => {
			if (key === 'liquibase') {
				return;
			}
			const value = this.params[key];
			cmd = `${cmd} --${key}=${value}`;
		});
		return cmd;
	}

	exec(command, options = {}) {
		let child;
		let promise = new Promise((resolve, reject) => {
			child = childProcess
				.exec(command, options, (error, stdout, stderr) => {
					if (error) {
						error.stderr = stderr;
						return reject(error);
					}
					resolve({stdout: stdout});
				});
		});
		promise.child = child;
		return promise;
	}

	run(action = 'update', params = '') {
		return this.exec(`${this.command} ${action} ${params}`);
	}
}

module.exports = params => new Liquibase(params);
