from flask import Flask, request, send_from_directory, render_template

app = Flask(__name__)


@app.route("/ants")
def index():
    return render_template("ants.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="8080", debug=True)