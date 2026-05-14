# Quality Review Hub

A professional Django REST API for managing quality reviews and assessments with JWT authentication.

## Features

- **RESTful API** built with Django 6.0 and Django REST Framework 3.17
- **JWT Authentication** via djangorestframework-simplejwt for secure token-based access
- **PostgreSQL Database** with psycopg2-binary for reliable data persistence
- **Production Ready** with Gunicorn/Uvicorn support for WSGI/ASGI deployment
- **Admin Panel** via Django admin interface for content management

## Tech Stack

- **Python** 3.11+ (recommended)
- **Django** 6.0.4
- **Django REST Framework** 3.17.1
- **PostgreSQL** with psycopg2-binary 2.9.12
- **JWT** Authentication via djangorestframework-simplejwt
- **Gunicorn** for production WSGI serving

## Prerequisites

- Python 3.11 or higher
- PostgreSQL database server running and accessible
- pip package manager
- Virtual environment tool (venv or virtualenv)

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd quality-review-hub
```

### 2. Create Virtual Environment
```bash
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables
Create a `.env` file in the project root:
```
DEBUG=True
DJANGO_SECRET_KEY=your-secret-key-here
DATABASE_URL=postgresql://user:password@localhost:5432/quality_review_hub
# OR individual DB settings:
# DB_ENGINE=django.db.backends.postgresql
# DB_NAME=quality_review_hub
# DB_USER=postgres
# DB_PASSWORD=your-password
# DB_HOST=localhost
# DB_PORT=5432
```

### 5. Apply Database Migrations
```bash
python manage.py migrate
```

### 6. Create Superuser (Admin Account)
```bash
python manage.py createsuperuser
```

### 7. Run Development Server
```bash
python manage.py runserver 0.0.0.0:8000
```

The API will be available at `http://localhost:8000/`

## Running Tests

```bash
python manage.py test
```

## Project Structure

```
quality-review-hub/
├── manage.py                 # Django CLI entrypoint
├── requirements.txt          # Python dependencies
├── config/                   # Project configuration
│   ├── settings.py          # Django settings and configuration
│   ├── urls.py              # URL routing
│   ├── wsgi.py              # WSGI application for production
│   └── asgi.py              # ASGI application for async serving
└── apps/                     # Django applications (features)
```

## Production Deployment

### Using Gunicorn (WSGI)
```bash
pip install gunicorn
gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 4
```

### Using Uvicorn (ASGI)
```bash
pip install uvicorn
uvicorn config.asgi:application --host 0.0.0.0 --port 8000
```

### Before Deploying
- Set `DEBUG=False` in production
- Use strong `DJANGO_SECRET_KEY` (generate a secure one)
- Configure `ALLOWED_HOSTS` for your domain
- Set up HTTPS/SSL with nginx or similar reverse proxy
- Use environment variables for sensitive data (secrets, credentials)

## API Documentation

The API uses JWT tokens for authentication. After user login, include the token in request headers:

```
Authorization: Bearer <your-jwt-token>
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Make your changes and commit them (`git commit -am 'Add feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Submit a Pull Request

## Support & Contact

For questions, issues, or support:
- Open an issue on GitHub
- Check existing documentation in the repository
- Review Django REST Framework docs: https://www.django-rest-framework.org/

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

**Last Updated:** May 2026
