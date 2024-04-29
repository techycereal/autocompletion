import json
import pytest
from app import app  # Replace with the name of your module

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_recieve_msg_post(client, mocker):
    # Mocking the complete function
    mocker.patch('app.complete', return_value=['mocked', 'results'])

    response = client.post('/', json={'msg': 'test'})
    data = json.loads(response.data.decode('utf-8'))

    assert response.status_code == 200
    assert data == ['mocked', 'results']

def test_recieve_msg_options(client):
    response = client.options('/')
    assert response.status_code == 200
    assert 'Access-Control-Allow-Methods' in response.headers
    assert response.headers['Access-Control-Allow-Methods'] == 'POST'