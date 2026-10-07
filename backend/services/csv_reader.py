import pandas as pd


def read_csv(file_path):

    dataframe = pd.read_csv(file_path)

    return dataframe


def validate_columns(
        dataframe,
        required_columns):

    missing = []

    for column in required_columns:

        if column not in dataframe.columns:

            missing.append(column)

    return missing