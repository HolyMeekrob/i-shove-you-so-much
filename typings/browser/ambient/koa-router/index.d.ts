// Ambient declaration for koa-router
declare namespace KoaRouter {

	interface Options {
		prefix: string;
	}

	interface AllowedMethodsOptions {
		throw: boolean;
		notImplemented: Function;
		methodNotAllowed: Function;
	}

	type Middleware = (ctx: Object, next: Function) => any;

	class Router {
		constructor(opts?: Options);
		routes(): Middleware;
		get(path: string, middleware: Middleware): Router;
		post(path: string, middleware: Middleware): Router;
		put(path: string, middleware: Middleware): Router;
		patch(path: string, middleware: Middleware): Router;
		del(path: string, middleware: Middleware): Router;
		use(path: string, middleware: Middleware): Router;
		use(paths: [string], middleware: Middleware): Router;
		prefix(prefix: string): Router;
		allowedMethods(options: AllowedMethodsOptions): Function;
		redirect (source: string, destination: string, code: number): Router;
		route(name: string): Object|boolean;
		url(name: String, params: Object): string|Error;
		param(param: string, middleware: Function): Router;
		static url(name: String, params: Object): string
	}
}

declare module 'koa-router' {
	function main(): KoaRouter.Router;
	namespace main {}
	export = main;
}
