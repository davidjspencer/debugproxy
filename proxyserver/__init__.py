from mitmproxy.utils import version_check
from mitmproxy.tools import cmdline
from mitmproxy.proxy import config
from mitmproxy.proxy import server
from mitmproxy import exceptions
from mitmproxy import options


def process_options(parser, options, args):
    if args.version:
        print("args.version")
        sys.exit(0)

    pconf = config.ProxyConfig(options)
    if options.no_server:
        return server.DummyServer(pconf)
    else:
        try:
            return server.ProxyServer(pconf)
        except exceptions.ServerException as v:
            print(str(v), file=sys.stderr)
            sys.exit(1)


def proxyserver() -> None:
    version_check.check_pyopenssl_version()

    from proxyserver.master import Master

    parser = cmdline.mitmweb()
    args = parser.parse_args(None)
    web_options = options.Options()
    web_options.load_paths(args.conf)
    web_options.merge(cmdline.get_common_options(args))

    server = process_options(parser, web_options, args)
    master = Master(web_options, server)

    try:
        master.run()
    except (KeyboardInterrupt, RuntimeError):
        pass
