from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def test_healthy_route():
    response = client.get("/api/v1/healthy/")
    assert response.status_code == 200
    assert response.json() == {"status": True}


def test_healthy_route_strict_slashes():
    response = client.get("/api/v1/healthy")
    assert response.status_code == 200
    assert response.json() == {"status": True}
