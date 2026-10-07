import os

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph
)

from reportlab.lib.styles import getSampleStyleSheet


def generate_pdf(
        filename,
        title,
        content):

    os.makedirs("reports", exist_ok=True)

    pdf = SimpleDocTemplate(
        f"reports/{filename}"
    )

    styles = getSampleStyleSheet()

    elements = []

    elements.append(
        Paragraph(title, styles["Heading1"])
    )

    elements.append(
        Paragraph(content, styles["BodyText"])
    )

    pdf.build(elements)

    return f"reports/{filename}"