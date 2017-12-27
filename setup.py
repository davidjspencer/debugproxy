from setuptools import setup, find_packages

setup(
    name='debugproxy',
    version='0.0.1',
    description='Web based UI for mitmproxy',
    long_description='',

    packages=find_packages(exclude=['tests']),

    install_requires=[
        'mitmproxy',
        'pytest',
        'tornado'
    ],

    entry_points={
        'console_scripts': [
            'debugproxy=proxyserver.main:start',
        ],
    }
)
