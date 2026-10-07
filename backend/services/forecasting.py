import numpy as np

from sklearn.linear_model import LinearRegression


def production_forecast(values):

    if len(values) < 2:
        return []

    x = np.arange(len(values)).reshape(-1, 1)

    y = np.array(values)

    model = LinearRegression()

    model.fit(x, y)

    future = np.arange(
        len(values),
        len(values) + 7
    ).reshape(-1, 1)

    prediction = model.predict(future)

    return prediction.tolist()