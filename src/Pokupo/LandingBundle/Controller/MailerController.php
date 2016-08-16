<?php

namespace Pokupo\LandingBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class MailerController extends Controller {

    public function sendRequestPartnershipAction(Request $request) {
        $name = $request->get('name');
        $email = $request->get('email');
        $text = $request->get('text');

        $message = \Swift_Message::newInstance()
                ->setSubject('Заявка на партнёрство')
                ->setContentType('text/html')
                ->setFrom($this->container->getParameter('mailer_mail_from'))
                ->setTo($this->container->getParameter('mailer_mail_to'))
                ->setBody(
                $this->renderView(
                        'PokupoLandingBundle:Mailer:_email.html.twig', array(
                    'email' => $email,
                    'name' => $name,
                    'text' => $text)
        ));
        $this->get('mailer')->send($message);
        
        return $this->render(
                  'PokupoLandingBundle:Mailer:_result.html.twig', array()
             );
    }

}
