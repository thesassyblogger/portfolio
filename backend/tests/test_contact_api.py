"""Backend tests for the portfolio contact API (POST/GET /api/contact)."""
import os
import time
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://dev-portfolio-3d-106.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# --- Health -----------------------------------------------------------------
class TestHealth:
    def test_root(self, client):
        r = client.get(f"{API}/")
        assert r.status_code == 200
        assert r.json().get("message") == "Hello World"


# --- Contact create/list ----------------------------------------------------
class TestContactCreate:
    def test_create_contact_success_and_persists(self, client):
        unique = f"TEST_{int(time.time()*1000)}"
        payload = {
            "name": f"TEST_User_{unique}",
            "email": f"test_{unique}@example.com",
            "subject": f"TEST_Subject_{unique}",
            "message": f"Hello there {unique}",
        }
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 201, r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["subject"] == payload["subject"]
        assert data["message"] == payload["message"]
        assert isinstance(data.get("id"), str) and len(data["id"]) > 0
        assert "_id" not in data
        assert "created_at" in data

        # Verify persistence via GET
        r2 = client.get(f"{API}/contact")
        assert r2.status_code == 200
        items = r2.json()
        assert isinstance(items, list)
        ids = [it.get("id") for it in items]
        assert data["id"] in ids
        # Ensure no raw mongo _id leaked
        for it in items:
            assert "_id" not in it

    def test_create_contact_optional_subject_default(self, client):
        payload = {
            "name": "TEST_NoSubject",
            "email": "test_nosubject@example.com",
            "message": "message body",
        }
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 201, r.text
        data = r.json()
        assert data["subject"] == ""

    def test_create_contact_invalid_email_422(self, client):
        payload = {
            "name": "TEST_BadEmail",
            "email": "not-an-email",
            "subject": "s",
            "message": "m",
        }
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 422, r.text

    def test_create_contact_missing_required_fields_422(self, client):
        # missing message
        r = client.post(f"{API}/contact", json={"name": "TEST_MissingMsg", "email": "a@b.com"})
        assert r.status_code == 422
        # missing name
        r = client.post(f"{API}/contact", json={"email": "a@b.com", "message": "hi"})
        assert r.status_code == 422
        # missing email
        r = client.post(f"{API}/contact", json={"name": "TEST_NoEmail", "message": "hi"})
        assert r.status_code == 422

    def test_create_contact_empty_strings_422(self, client):
        r = client.post(f"{API}/contact", json={"name": "", "email": "a@b.com", "message": "hi"})
        assert r.status_code == 422
        r = client.post(f"{API}/contact", json={"name": "n", "email": "a@b.com", "message": ""})
        assert r.status_code == 422


class TestContactList:
    def test_list_contact_returns_list(self, client):
        r = client.get(f"{API}/contact")
        assert r.status_code == 200
        assert isinstance(r.json(), list)
