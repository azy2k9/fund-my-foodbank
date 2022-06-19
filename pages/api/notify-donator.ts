// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import Mailer from 'nodemailer';
import fs from 'fs';

type Data = {
    message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        try {
            const transport = Mailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_PASS,
                },
            });
            const {
                foodbank_names,
                donator_name,
                people_helped,
                money_raised,
                food_packs_donated,
                donator_email = 'azy2k9@gmail.com',
            } = req.body as {
                foodbank_names: Array<string>;
                donator_name: string;
                people_helped: string;
                money_raised: string;
                food_packs_donated: string;
                donator_email: string;
            };

            if (Array.isArray(foodbank_names) && foodbank_names.length > 0) {
                foodbank_names.forEach((foodbank_name) => {
                    const mailOptions = {
                        from: 'hello@fundmyfoodbank.com',
                        to: donator_email,
                        subject: 'Feedback recived!',
                        html: getTemplate({
                            foodbank_name,
                            donator_name,
                            people_helped,
                            food_packs_donated,
                            money_raised,
                        }),
                    };

                    transport.sendMail({ ...mailOptions }, function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('successfully sent the email');
                        }
                    });
                });
            }
            res.status(200).json({ message: 'send some emails' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}

const getTemplate = ({
    foodbank_name,
    donator_name,
    money_raised,
    people_helped,
    food_packs_donated,
}: {
    foodbank_name: string;
    donator_name: string;
    people_helped: string;
    money_raised: string;
    food_packs_donated: string;
}) => {
    return `
        <!DOCTYPE html>
            <html
            lang="en"
            xmlns:o="urn:schemas-microsoft-com:office:office"
            xmlns:v="urn:schemas-microsoft-com:vml"
            >
            <head>
                <title></title>
                <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
                <meta content="width=device-width, initial-scale=1.0" name="viewport" />
                <!--[if mso
                ]><xml
                    ><o:OfficeDocumentSettings
                    ><o:PixelsPerInch>96</o:PixelsPerInch
                    ><o:AllowPNG /></o:OfficeDocumentSettings></xml
                ><![endif]-->
                <!--[if !mso]><!-->
                <link
                href="https://fonts.googleapis.com/css?family=Roboto"
                rel="stylesheet"
                type="text/css"
                />
                <link
                href="https://fonts.googleapis.com/css?family=Abril+Fatface"
                rel="stylesheet"
                type="text/css"
                />
                <link
                href="https://fonts.googleapis.com/css?family=Merriweather"
                rel="stylesheet"
                type="text/css"
                />
                <link
                href="https://fonts.googleapis.com/css?family=Montserrat"
                rel="stylesheet"
                type="text/css"
                />
                <link
                href="https://fonts.googleapis.com/css?family=Nunito"
                rel="stylesheet"
                type="text/css"
                />
                <link
                href="https://fonts.googleapis.com/css?family=Bitter"
                rel="stylesheet"
                type="text/css"
                />
                <link
                href="https://fonts.googleapis.com/css?family=Permanent+Marker"
                rel="stylesheet"
                type="text/css"
                />
                <link
                href="https://fonts.googleapis.com/css?family=Roboto+Slab"
                rel="stylesheet"
                type="text/css"
                />
                <link
                href="https://fonts.googleapis.com/css?family=Cabin"
                rel="stylesheet"
                type="text/css"
                />
                <link
                href="https://fonts.googleapis.com/css?family=Oxygen"
                rel="stylesheet"
                type="text/css"
                />
                <link
                href="https://fonts.googleapis.com/css?family=Oswald"
                rel="stylesheet"
                type="text/css"
                />
                <link
                href="https://fonts.googleapis.com/css?family=Lato"
                rel="stylesheet"
                type="text/css"
                />
                <link
                href="https://fonts.googleapis.com/css?family=Ubuntu"
                rel="stylesheet"
                type="text/css"
                />
                <link
                href="https://fonts.googleapis.com/css?family=Open+Sans"
                rel="stylesheet"
                type="text/css"
                />
                <link
                href="https://fonts.googleapis.com/css?family=Droid+Serif"
                rel="stylesheet"
                type="text/css"
                />
                <link
                href="https://fonts.googleapis.com/css?family=Playfair+Display"
                rel="stylesheet"
                type="text/css"
                />
                <link
                href="https://fonts.googleapis.com/css?family=Poppins"
                rel="stylesheet"
                type="text/css"
                />
                <!--<![endif]-->
                <style>
                * {
                    box-sizing: border-box;
                }

                body {
                    margin: 0;
                    padding: 0;
                }

                a[x-apple-data-detectors] {
                    color: inherit !important;
                    text-decoration: inherit !important;
                }

                #MessageViewBody a {
                    color: inherit;
                    text-decoration: none;
                }

                p {
                    line-height: inherit;
                }

                .desktop_hide,
                .desktop_hide table {
                    mso-hide: all;
                    display: none;
                    max-height: 0px;
                    overflow: hidden;
                }

                @media (max-width: 700px) {
                    .desktop_hide table.icons-inner {
                    display: inline-block !important;
                    }

                    .icons-inner {
                    text-align: center;
                    }

                    .icons-inner td {
                    margin: 0 auto;
                    }

                    .image_block img.big,
                    .row-content {
                    width: 100% !important;
                    }

                    .mobile_hide {
                    display: none;
                    }

                    .stack .column {
                    width: 100%;
                    display: block;
                    }

                    .mobile_hide {
                    min-height: 0;
                    max-height: 0;
                    max-width: 0;
                    overflow: hidden;
                    font-size: 0px;
                    }

                    .desktop_hide,
                    .desktop_hide table {
                    display: table !important;
                    max-height: none !important;
                    }
                }
                </style>
            </head>
            <body
                style="
                background-color: #fafafa;
                margin: 0;
                padding: 0;
                -webkit-text-size-adjust: none;
                text-size-adjust: none;
                "
            >
                <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                class="nl-container"
                role="presentation"
                style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    background-color: #fafafa;
                "
                width="100%"
                >
                <tbody>
                    <tr>
                    <td>
                        <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row row-1"
                        role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                        width="100%"
                        >
                        <tbody>
                            <tr>
                            <td>
                                <table
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="row-content"
                                role="presentation"
                                style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    background-color: #edeff4;
                                    color: #000000;
                                    width: 680px;
                                "
                                width="680"
                                >
                                <tbody>
                                    <tr>
                                    <td
                                        class="column column-1"
                                        style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        vertical-align: top;
                                        padding-top: 20px;
                                        padding-bottom: 20px;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                        "
                                        width="100%"
                                    >
                                        <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="icons_block"
                                        role="presentation"
                                        style="
                                            mso-table-lspace: 0pt;
                                            mso-table-rspace: 0pt;
                                        "
                                        width="100%"
                                        >
                                        <tr>
                                            <td
                                            style="
                                                vertical-align: middle;
                                                color: #000000;
                                                font-family: inherit;
                                                font-size: 15px;
                                                text-align: center;
                                            "
                                            >
                                            <table
                                                align="center"
                                                cellpadding="0"
                                                cellspacing="0"
                                                role="presentation"
                                                style="
                                                mso-table-lspace: 0pt;
                                                mso-table-rspace: 0pt;
                                                "
                                            >
                                                <tr>
                                                <td
                                                    style="
                                                    vertical-align: middle;
                                                    text-align: center;
                                                    padding-top: 5px;
                                                    padding-bottom: 5px;
                                                    padding-left: 5px;
                                                    padding-right: 5px;
                                                    "
                                                >
                                                    <img
                                                    align="center"
                                                    alt=""
                                                    class="icon"
                                                    height="64"
                                                    src="images/option_4__Basket_icon_with_circle_2_1.svg"
                                                    style="
                                                        display: block;
                                                        height: auto;
                                                        margin: 0 auto;
                                                        border: 0;
                                                    "
                                                    width="84"
                                                    />
                                                </td>
                                                </tr>
                                            </table>
                                            </td>
                                        </tr>
                                        </table>
                                        <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="heading_block"
                                        role="presentation"
                                        style="
                                            mso-table-lspace: 0pt;
                                            mso-table-rspace: 0pt;
                                        "
                                        width="100%"
                                        >
                                        <tr>
                                            <td style="text-align: center; width: 100%">
                                            <h3
                                                style="
                                                margin: 0;
                                                color: #555555;
                                                direction: ltr;
                                                font-family: Open Sans, Helvetica Neue,
                                                    Helvetica, Arial, sans-serif;
                                                font-size: 12px;
                                                font-weight: 700;
                                                letter-spacing: normal;
                                                line-height: 120%;
                                                text-align: center;
                                                margin-top: 0;
                                                margin-bottom: 0;
                                                "
                                            >
                                                <span class="tinyMce-placeholder"
                                                >"Making it easy to support your
                                                community"</span
                                                >
                                            </h3>
                                            </td>
                                        </tr>
                                        </table>
                                    </td>
                                    </tr>
                                </tbody>
                                </table>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                        <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row row-2"
                        role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                        width="100%"
                        >
                        <tbody>
                            <tr>
                            <td>
                                <table
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="row-content stack"
                                role="presentation"
                                style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    background-color: #48bb78;
                                    color: #000000;
                                    width: 680px;
                                "
                                width="680"
                                >
                                <tbody>
                                    <tr>
                                    <td
                                        class="column column-1"
                                        style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        vertical-align: top;
                                        padding-left: 30px;
                                        padding-right: 30px;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                        "
                                        width="50%"
                                    >
                                        <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="image_block"
                                        role="presentation"
                                        style="
                                            mso-table-lspace: 0pt;
                                            mso-table-rspace: 0pt;
                                        "
                                        width="100%"
                                        >
                                        <tr>
                                            <td
                                            style="
                                                width: 100%;
                                                padding-right: 0px;
                                                padding-left: 0px;
                                                padding-top: 20px;
                                                padding-bottom: 5px;
                                            "
                                            >
                                            <div align="center" style="line-height: 10px">
                                                <img
                                                alt="Hands"
                                                src="images/hands.png"
                                                style="
                                                    display: block;
                                                    height: auto;
                                                    border: 0;
                                                    width: 210px;
                                                    max-width: 100%;
                                                "
                                                title="Hands"
                                                width="210"
                                                />
                                            </div>
                                            </td>
                                        </tr>
                                        </table>
                                    </td>
                                    <td
                                        class="column column-2"
                                        style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        vertical-align: top;
                                        padding-left: 60px;
                                        padding-right: 50px;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                        "
                                        width="50%"
                                    >
                                        <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="heading_block"
                                        role="presentation"
                                        style="
                                            mso-table-lspace: 0pt;
                                            mso-table-rspace: 0pt;
                                        "
                                        width="100%"
                                        >
                                        <tr>
                                            <td
                                            style="
                                                text-align: center;
                                                width: 100%;
                                                padding-top: 65px;
                                            "
                                            >
                                            <h3
                                                style="
                                                margin: 0;
                                                color: #fafafa;
                                                direction: ltr;
                                                font-family: Open Sans, Helvetica Neue,
                                                    Helvetica, Arial, sans-serif;
                                                font-size: 14px;
                                                font-weight: 400;
                                                letter-spacing: 1px;
                                                line-height: 120%;
                                                text-align: left;
                                                margin-top: 0;
                                                margin-bottom: 0;
                                                "
                                            >
                                                <strong
                                                ><span class="tinyMce-placeholder"
                                                    >MAKE A DIFFERENCE</span
                                                ></strong
                                                >
                                            </h3>
                                            </td>
                                        </tr>
                                        </table>
                                        <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="text_block"
                                        role="presentation"
                                        style="
                                            mso-table-lspace: 0pt;
                                            mso-table-rspace: 0pt;
                                            word-break: break-word;
                                        "
                                        width="100%"
                                        >
                                        <tr>
                                            <td style="padding-bottom: 45px">
                                            <div style="font-family: sans-serif">
                                                <div
                                                class="txtTinyMce-wrapper"
                                                style="
                                                    font-size: 12px;
                                                    mso-line-height-alt: 18px;
                                                    color: #ffffff;
                                                    line-height: 1.5;
                                                    font-family: Open Sans, Helvetica Neue,
                                                    Helvetica, Arial, sans-serif;
                                                "
                                                >
                                                <p
                                                    style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                    text-align: left;
                                                    "
                                                >
                                                    <strong
                                                    ><span
                                                        class="tinyMce-placeholder"
                                                        style="font-size: 28px"
                                                        ><span
                                                        class="tinyMce-placeholder"
                                                        style=""
                                                        >Your foodbank is helping
                                                        people</span
                                                        ></span
                                                    ></strong
                                                    >
                                                </p>
                                                </div>
                                            </div>
                                            </td>
                                        </tr>
                                        </table>
                                    </td>
                                    </tr>
                                </tbody>
                                </table>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                        <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row row-3"
                        role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                        width="100%"
                        >
                        <tbody>
                            <tr>
                            <td>
                                <table
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="row-content stack"
                                role="presentation"
                                style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    background-color: #ffffff;
                                    color: #000000;
                                    width: 680px;
                                "
                                width="680"
                                >
                                <tbody>
                                    <tr>
                                    <td
                                        class="column column-1"
                                        style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        vertical-align: top;
                                        padding-top: 5px;
                                        padding-bottom: 5px;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                        "
                                        width="100%"
                                    >
                                        <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="paragraph_block"
                                        role="presentation"
                                        style="
                                            mso-table-lspace: 0pt;
                                            mso-table-rspace: 0pt;
                                            word-break: break-word;
                                        "
                                        width="100%"
                                        >
                                        <tr>
                                            <td
                                            style="
                                                padding-bottom: 10px;
                                                padding-left: 60px;
                                                padding-right: 60px;
                                                padding-top: 60px;
                                            "
                                            >
                                            <div
                                                style="
                                                color: #000000;
                                                direction: ltr;
                                                font-family: Open Sans, Helvetica Neue,
                                                    Helvetica, Arial, sans-serif;
                                                font-size: 22px;
                                                font-weight: 700;
                                                letter-spacing: 0px;
                                                line-height: 120%;
                                                text-align: center;
                                                mso-line-height-alt: 26.4px;
                                                "
                                            >
                                                <p style="margin: 0; margin-bottom: 14px">
                                                Hi ${donator_name},
                                                </p>
                                                <p style="margin: 0; margin-bottom: 14px">
                                                 
                                                </p>
                                                <p style="margin: 0; margin-bottom: 14px">
                                                <strong
                                                    ><span
                                                    style="
                                                        font-family: inherit;
                                                        background-color: transparent;
                                                    "
                                                    >Your food bank is making great
                                                    progress!</span
                                                    ></strong
                                                >
                                                </p>
                                                <p style="margin: 0; margin-bottom: 14px">
                                                 
                                                </p>
                                                <p style="margin: 0; margin-bottom: 14px">
                                                <strong
                                                    ><span
                                                    style="
                                                        font-family: inherit;
                                                        background-color: transparent;
                                                    "
                                                    >${foodbank_name} has used your
                                                    donation
                                                    </span></strong
                                                >
                                                </p>
                                                <p style="margin: 0; margin-bottom: 14px">
                                                <strong
                                                    ><span
                                                    style="
                                                        font-family: inherit;
                                                        background-color: transparent;
                                                    "
                                                    >to help with the following:</span
                                                    ></strong
                                                >
                                                </p>
                                                <p style="margin: 0; margin-bottom: 14px">
                                                 
                                                </p>
                                                <p style="margin: 0; margin-bottom: 14px">
                                                <strong
                                                    ><span
                                                    style="
                                                        font-family: inherit;
                                                        background-color: transparent;
                                                    "
                                                    >-  We have helped ${people_helped}
                                                    people this month!</span
                                                    ></strong
                                                >
                                                </p>
                                                <p style="margin: 0; margin-bottom: 14px">
                                                <strong
                                                    ><span
                                                    style="
                                                        font-family: inherit;
                                                        background-color: transparent;
                                                    "
                                                    >- We have donated
                                                    ${food_packs_donated} food packs this
                                                    month!</span
                                                    ></strong
                                                >
                                                </p>
                                                <p style="margin: 0; margin-bottom: 14px">
                                                <strong
                                                    ><span
                                                    style="
                                                        font-family: inherit;
                                                        background-color: transparent;
                                                    "
                                                    >- The community has donated
                                                    ${money_raised} this month ♥️</span
                                                    ></strong
                                                >
                                                </p>
                                                <p style="margin: 0; margin-bottom: 14px">
                                                 
                                                </p>
                                                <p style="margin: 0">
                                                <span
                                                    style="
                                                    font-family: inherit;
                                                    background-color: transparent;
                                                    "
                                                    >Awesome right?</span
                                                >
                                                </p>
                                            </div>
                                            </td>
                                        </tr>
                                        </table>
                                    </td>
                                    </tr>
                                </tbody>
                                </table>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                        <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row row-4"
                        role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                        width="100%"
                        >
                        <tbody>
                            <tr>
                            <td>
                                <table
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="row-content stack"
                                role="presentation"
                                style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    background-color: #ffffff;
                                    color: #000000;
                                    width: 680px;
                                "
                                width="680"
                                >
                                <tbody>
                                    <tr>
                                    <td
                                        class="column column-1"
                                        style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        vertical-align: top;
                                        padding-left: 50px;
                                        padding-right: 50px;
                                        padding-top: 40px;
                                        padding-bottom: 30px;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                        "
                                        width="100%"
                                    >
                                        <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="heading_block"
                                        role="presentation"
                                        style="
                                            mso-table-lspace: 0pt;
                                            mso-table-rspace: 0pt;
                                        "
                                        width="100%"
                                        >
                                        <tr>
                                            <td
                                            style="
                                                padding-bottom: 10px;
                                                padding-top: 15px;
                                                text-align: center;
                                                width: 100%;
                                            "
                                            >
                                            <h3
                                                style="
                                                margin: 0;
                                                color: #000000;
                                                direction: ltr;
                                                font-family: Open Sans, Helvetica Neue,
                                                    Helvetica, Arial, sans-serif;
                                                font-size: 25px;
                                                font-weight: 400;
                                                letter-spacing: normal;
                                                line-height: 120%;
                                                text-align: center;
                                                margin-top: 0;
                                                margin-bottom: 0;
                                                "
                                            >
                                                <span class="tinyMce-placeholder"
                                                >You're a hero in your community </span
                                                >
                                            </h3>
                                            </td>
                                        </tr>
                                        </table>
                                        <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="text_block"
                                        role="presentation"
                                        style="
                                            mso-table-lspace: 0pt;
                                            mso-table-rspace: 0pt;
                                            word-break: break-word;
                                        "
                                        width="100%"
                                        >
                                        <tr>
                                            <td
                                            style="
                                                padding-bottom: 15px;
                                                padding-left: 30px;
                                                padding-right: 30px;
                                                padding-top: 10px;
                                            "
                                            >
                                            <div style="font-family: sans-serif">
                                                <div
                                                class="txtTinyMce-wrapper"
                                                style="
                                                    font-size: 12px;
                                                    mso-line-height-alt: 18px;
                                                    color: #636363;
                                                    line-height: 1.5;
                                                    font-family: Open Sans, Helvetica Neue,
                                                    Helvetica, Arial, sans-serif;
                                                "
                                                >
                                                <p
                                                    style="
                                                    margin: 0;
                                                    font-size: 14px;
                                                    text-align: center;
                                                    mso-line-height-alt: 24px;
                                                    "
                                                >
                                                    <span
                                                    class="tinyMce-placeholder"
                                                    style="font-size: 16px"
                                                    >The donations made by
                                                    <strong
                                                        >YOU and the rest of the community
                                                        are</strong
                                                    >
                                                    making all the difference. You are the
                                                    reason that people this month won't
                                                    have to choose between heating their
                                                    home or feeding their children
                                                    ♥️</span
                                                    >
                                                </p>
                                                </div>
                                            </div>
                                            </td>
                                        </tr>
                                        </table>
                                    </td>
                                    </tr>
                                </tbody>
                                </table>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                        <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row row-5"
                        role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                        width="100%"
                        >
                        <tbody>
                            <tr>
                            <td>
                                <table
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="row-content stack"
                                role="presentation"
                                style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    background-color: #ffffff;
                                    color: #000000;
                                    width: 680px;
                                "
                                width="680"
                                >
                                <tbody>
                                    <tr>
                                    <td
                                        class="column column-1"
                                        style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        vertical-align: top;
                                        padding-top: 5px;
                                        padding-bottom: 0px;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                        "
                                        width="100%"
                                    >
                                        <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="image_block"
                                        role="presentation"
                                        style="
                                            mso-table-lspace: 0pt;
                                            mso-table-rspace: 0pt;
                                        "
                                        width="100%"
                                        >
                                        <tr>
                                            <td
                                            style="
                                                width: 100%;
                                                padding-right: 0px;
                                                padding-left: 0px;
                                            "
                                            >
                                            <div align="center" style="line-height: 10px">
                                                <img
                                                alt="Donations"
                                                class="big"
                                                src="images/donations-filled.png"
                                                style="
                                                    display: block;
                                                    height: auto;
                                                    border: 0;
                                                    width: 442px;
                                                    max-width: 100%;
                                                "
                                                title="Donations"
                                                width="442"
                                                />
                                            </div>
                                            </td>
                                        </tr>
                                        </table>
                                    </td>
                                    </tr>
                                </tbody>
                                </table>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                        <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row row-6"
                        role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                        width="100%"
                        >
                        <tbody>
                            <tr>
                            <td>
                                <table
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="row-content stack"
                                role="presentation"
                                style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    background-color: #edeff4;
                                    color: #000000;
                                    width: 680px;
                                "
                                width="680"
                                >
                                <tbody>
                                    <tr>
                                    <td
                                        class="column column-1"
                                        style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        vertical-align: top;
                                        padding-top: 5px;
                                        padding-bottom: 5px;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                        "
                                        width="100%"
                                    >
                                        <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="heading_block"
                                        role="presentation"
                                        style="
                                            mso-table-lspace: 0pt;
                                            mso-table-rspace: 0pt;
                                        "
                                        width="100%"
                                        >
                                        <tr>
                                            <td
                                            style="
                                                padding-bottom: 25px;
                                                padding-top: 35px;
                                                text-align: center;
                                                width: 100%;
                                            "
                                            >
                                            <h3
                                                style="
                                                margin: 0;
                                                color: #000000;
                                                direction: ltr;
                                                font-family: Open Sans, Helvetica Neue,
                                                    Helvetica, Arial, sans-serif;
                                                font-size: 25px;
                                                font-weight: 400;
                                                letter-spacing: normal;
                                                line-height: 120%;
                                                text-align: center;
                                                margin-top: 0;
                                                margin-bottom: 0;
                                                "
                                            >
                                                <span class="tinyMce-placeholder"
                                                >Most useful items</span
                                                >
                                            </h3>
                                            </td>
                                        </tr>
                                        </table>
                                    </td>
                                    </tr>
                                </tbody>
                                </table>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                        <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row row-7"
                        role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                        width="100%"
                        >
                        <tbody>
                            <tr>
                            <td>
                                <table
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="row-content stack"
                                role="presentation"
                                style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    background-color: #edeff4;
                                    color: #000000;
                                    width: 680px;
                                "
                                width="680"
                                >
                                <tbody>
                                    <tr>
                                    <td
                                        class="column column-1"
                                        style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        vertical-align: top;
                                        padding-left: 30px;
                                        padding-right: 30px;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                        "
                                        width="50%"
                                    >
                                        <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="text_block"
                                        role="presentation"
                                        style="
                                            mso-table-lspace: 0pt;
                                            mso-table-rspace: 0pt;
                                            word-break: break-word;
                                        "
                                        width="100%"
                                        >
                                        <tr>
                                            <td
                                            style="
                                                padding-left: 30px;
                                                padding-right: 30px;
                                                padding-top: 5px;
                                            "
                                            >
                                            <div style="font-family: sans-serif">
                                                <div
                                                class="txtTinyMce-wrapper"
                                                style="
                                                    font-size: 12px;
                                                    mso-line-height-alt: 18px;
                                                    color: #1d1d1b;
                                                    line-height: 1.5;
                                                    font-family: Open Sans, Helvetica Neue,
                                                    Helvetica, Arial, sans-serif;
                                                "
                                                >
                                                <ul
                                                    style="
                                                    line-height: 1.5;
                                                    mso-line-height-alt: 18px;
                                                    font-size: 16px;
                                                    "
                                                >
                                                    <li>
                                                    <span
                                                        class="tinyMce-placeholder"
                                                        style="font-size: 16px"
                                                        >Meals</span
                                                    >
                                                    </li>
                                                    <li>
                                                    <span
                                                        class="tinyMce-placeholder"
                                                        style="font-size: 16px"
                                                        >Groceries
                                                    </span>
                                                    </li>
                                                    <li>
                                                    <p style="margin: 0">
                                                        Medical supplies
                                                    </p>
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            </td>
                                        </tr>
                                        </table>
                                    </td>
                                    <td
                                        class="column column-2"
                                        style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        vertical-align: top;
                                        padding-left: 30px;
                                        padding-right: 30px;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                        "
                                        width="50%"
                                    >
                                        <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="text_block"
                                        role="presentation"
                                        style="
                                            mso-table-lspace: 0pt;
                                            mso-table-rspace: 0pt;
                                            word-break: break-word;
                                        "
                                        width="100%"
                                        >
                                        <tr>
                                            <td
                                            style="
                                                padding-bottom: 35px;
                                                padding-left: 30px;
                                                padding-right: 30px;
                                            "
                                            >
                                            <div style="font-family: sans-serif">
                                                <div
                                                class="txtTinyMce-wrapper"
                                                style="
                                                    font-size: 12px;
                                                    mso-line-height-alt: 18px;
                                                    color: #1d1d1b;
                                                    line-height: 1.5;
                                                    font-family: Open Sans, Helvetica Neue,
                                                    Helvetica, Arial, sans-serif;
                                                "
                                                >
                                                <ul
                                                    style="
                                                    line-height: 1.5;
                                                    mso-line-height-alt: 18px;
                                                    font-size: 16px;
                                                    "
                                                >
                                                    <li>
                                                    <p style="margin: 0">
                                                        Food and baby items
                                                    </p>
                                                    </li>
                                                    <li>
                                                    <p
                                                        style="
                                                        margin: 0;
                                                        mso-line-height-alt: 24px;
                                                        "
                                                    >
                                                        <span
                                                        class="tinyMce-placeholder"
                                                        style="font-size: 16px"
                                                        >Clothes</span
                                                        >
                                                    </p>
                                                    </li>
                                                    <li>
                                                    <span
                                                        class="tinyMce-placeholder"
                                                        style="font-size: 16px"
                                                        >Blankets</span
                                                    >
                                                    </li>
                                                </ul>
                                                </div>
                                            </div>
                                            </td>
                                        </tr>
                                        </table>
                                    </td>
                                    </tr>
                                </tbody>
                                </table>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                        <table
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        class="row row-8"
                        role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                        width="100%"
                        >
                        <tbody>
                            <tr>
                            <td>
                                <table
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                class="row-content stack"
                                role="presentation"
                                style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    color: #000000;
                                    width: 680px;
                                "
                                width="680"
                                >
                                <tbody>
                                    <tr>
                                    <td
                                        class="column column-1"
                                        style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        font-weight: 400;
                                        text-align: left;
                                        vertical-align: top;
                                        padding-top: 20px;
                                        padding-bottom: 20px;
                                        border-top: 0px;
                                        border-right: 0px;
                                        border-bottom: 0px;
                                        border-left: 0px;
                                        "
                                        width="100%"
                                    >
                                        <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="text_block"
                                        role="presentation"
                                        style="
                                            mso-table-lspace: 0pt;
                                            mso-table-rspace: 0pt;
                                            word-break: break-word;
                                        "
                                        width="100%"
                                        >
                                        <tr>
                                            <td
                                            style="
                                                padding-bottom: 30px;
                                                padding-left: 30px;
                                                padding-right: 30px;
                                                padding-top: 15px;
                                            "
                                            >
                                            <div style="font-family: sans-serif">
                                                <div
                                                class="txtTinyMce-wrapper"
                                                style="
                                                    font-size: 12px;
                                                    font-family: Open Sans, Helvetica Neue,
                                                    Helvetica, Arial, sans-serif;
                                                    mso-line-height-alt: 18px;
                                                    color: #000000;
                                                    line-height: 1.5;
                                                "
                                                >
                                                <p
                                                    style="
                                                    margin: 0;
                                                    font-size: 10px;
                                                    text-align: center;
                                                    mso-line-height-alt: 15px;
                                                    "
                                                >
                                                    <span style="font-size: 10px"
                                                    >If you have questions regarding your
                                                    data, please visit our
                                                    <a
                                                        href="http://www.example.com"
                                                        rel="noopener"
                                                        style="
                                                        text-decoration: underline;
                                                        color: #0076da;
                                                        "
                                                        target="_blank"
                                                        >Privacy Policy</a
                                                    >
                                                    </span>
                                                </p>
                                                <p
                                                    style="
                                                    margin: 0;
                                                    font-size: 10px;
                                                    text-align: center;
                                                    mso-line-height-alt: 15px;
                                                    "
                                                >
                                                    <span style="font-size: 10px"
                                                    ><span style=""
                                                        ><span style=""
                                                        >Want to change how you receive
                                                        these emails? You can
                                                        <a
                                                            href="http://www.example.com"
                                                            rel="noopener"
                                                            style="
                                                            text-decoration: underline;
                                                            color: #0076da;
                                                            "
                                                            target="_blank"
                                                            >update your preferences</a
                                                        >
                                                        or
                                                        <a
                                                            href="http://www.example.com"
                                                            rel="noopener"
                                                            style="
                                                            text-decoration: underline;
                                                            color: #0076da;
                                                            "
                                                            target="_blank"
                                                            >unsubscribe</a
                                                        >
                                                        from this list. </span
                                                        ></span
                                                    ></span
                                                    >
                                                </p>
                                                <p
                                                    style="
                                                    margin: 0;
                                                    font-size: 10px;
                                                    text-align: center;
                                                    mso-line-height-alt: 15px;
                                                    "
                                                >
                                                    <span style="font-size: 10px"
                                                    ><span style=""
                                                        >© 2022 Company. </span
                                                    ></span
                                                    ><span style="font-size: 10px"
                                                    ><span style="">
                                                        All Rights Reserved.</span
                                                    ></span
                                                    >
                                                </p>
                                                </div>
                                            </div>
                                            </td>
                                        </tr>
                                        </table>
                                    </td>
                                    </tr>
                                </tbody>
                                </table>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </td>
                    </tr>
                </tbody>
                </table>
                <!-- End -->
            </body>
            </html>


    `;
};
