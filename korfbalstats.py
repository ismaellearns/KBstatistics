from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    """Rendert de hoofd-webpagina."""
    return render_template('index.html')

if __name__ == '__main__':
    # Start de Flask-server op de lokale host.
    app.run(debug=True)
