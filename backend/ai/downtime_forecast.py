import numpy as np
from sklearn.linear_model import LinearRegression


def forecast_downtime(data, days=7):

    if len(data) < 2:
        return {
            "forecast": [],
            "average": 0
        }

    X = np.arange(len(data)).reshape(-1, 1)

    y = np.array(data)

    model = LinearRegression()

    model.fit(X, y)

    future = np.arange(
        len(data),
        len(data) + days
    ).reshape(-1, 1)

    prediction = model.predict(future)

    return {

        "forecast": prediction.round(2).tolist(),

        "average": round(
            prediction.mean(),
            2
        )

    }