from setuptools import setup, find_packages

VERSION = '0.0.5'
DESCRIPTION = 'Typeahead feature'

# Setting up
setup(
    name="typeahead",
    version=VERSION,
    author="techy_cereal ",
    author_email="alexanderjmilliken@gmail.com",
    description=DESCRIPTION,
    long_description_content_type="text/markdown",
    packages=find_packages(),
    install_requires=[],
    keywords=['python', 'typeahead', 'auto complete'],
    classifiers=[
        "Development Status :: 1 - Planning",
        "Intended Audience :: Developers",
        "Programming Language :: Python :: 3",
        "Operating System :: Unix",
        "Operating System :: MacOS :: MacOS X",
        "Operating System :: Microsoft :: Windows",
    ]
)