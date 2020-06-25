<?php

if($_POST['data']) {
    //http://webi.ru/webi_files/php_libmail.html
    include "php_LibMail/libmail.php"; // вставляем файл с классом

    $data = json_decode($_POST['data']);

    $name_client  = $data->nameClient;
    $email_client  = $data->emailClient;
    $phone_client  = $data->phoneClient;
    $name_form  = $data->nameForm;
    if (isset($data->questionsClient)) {
        $questions = $data->questionsClient;
    }

    /* $agree_client  = $data->agreeClient;

    if ($agree_client == "true") {
        $agree_client = 'Да';
    } else {
        $agree_client = 'Нет';
    } */

    try {
        $text = '';
        $text .= "<b>Имя клиента: </b><br>" . $name_client . "<br><br>";
        $text .= "<b>Почта клиента: </b><br>" . $email_client . "<br><br>";
        $text .= "<b>Телефон клиента: </b><br>" . $phone_client . "<br><br>";

        if (isset($questions)) {
            foreach ($questions as $value) {
                if (isset($value->type)) {
                    if ($value->type == 'radio') {
                        $text .= "<br><b>" . $value->title . ": </b><br>" . $value->value . "<br>";
                    } else {
                        $text .= "<br><b>" . $value->title . ":</b><br>";

                        foreach ($value->value as $valueCheckbox) {
                            if ($valueCheckbox)
                                $text .= "- " . $valueCheckbox . "<br>";
                        }
                    }
                }
            }
        }
        // $text .= "Согласие на обработку данных: <b>" . $agree_client . "</b>";

        $m = new Mail; // начинаем
        $m->From( "FSB;info@profline-consult.ru" ); // от кого отправляется почта
        $m->To( "info@profline-consult.ru" ); // кому адресованно "info@profline-consult.ru"
        $m->Subject( "Форма: " . $name_form );
        $m->Body( $text , "html");
        $m->Cc( "marketing@kvott.ru"); // копия письма отправится по этому адресу
        //$m->Bcc( "bcopy@asd.com"); // скрытая копия отправится по этому адресу
        $m->Priority(3) ;    // приоритет письма
        //$m->Attach( "asd.gif","", "image/gif" ) ; // прикрепленный файл
        $m->smtp_on("ssl://smtp.yandex.ru", "info@profline-consult.ru", "fujwiimkFUjWiiMk2018" , 465) ; // если указана эта команда, отправка пойдет через SMTP  //ssl://
        $m->Send();    // а теперь пошла отправка

        echo "<div class='form__thanks'><p>Форма отправлена.</p><p>В ближайшее время мы свяжемся с Вами.</p></div>";
    } catch( Exception $e ) {
        echo $e->getMessage();
    }
}
