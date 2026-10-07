import numpy as np
from sklearn.linear_model import LinearRegression


def forecast_production(data, days=7):
    """
    data = list of production values
    Example:
    [520, 540, 560, 590]
    """

    if len(data) < 2:
        return {
            "history": data,
            "forecast": [],
            "confidence": 0,
            "trend": "Not enough data"
        }

    X = np.arange(len(data)).reshape(-1, 1)
    y = np.array(data)

    model = LinearRegression()
    model.fit(X, y)

    future_days = np.arange(len(data), len(data) + days).reshape(-1, 1)

    prediction = model.predict(future_days)

    score = model.score(X, y) * 100

    trend = (
        "Increasing"
        if prediction[-1] > prediction[0]
        else "Decreasing"
    )

    return {
        "history": data,
        "forecast": prediction.round(2).tolist(),
        "confidence": round(score, 2),
        "trend": trend
    }