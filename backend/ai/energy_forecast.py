import numpy as np
from sklearn.linear_model import LinearRegression


def forecast_energy(data, days=7):

    if len(data) == 0:
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

    prediction = np.maximum(prediction, 0)

    return {

        "forecast": prediction.round(2).tolist(),

        "average": round(
            float(prediction.mean()),
            2
        )

    }