package se.callistaenterprise.tutorial.oauth2.simpleclient.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("")
public class OAuth2ClientController {

	@RequestMapping("/")
	public String start() {
		return "start";
	}
	
	@RequestMapping("/redirect-to-authorization")
	public String redirect() {
		return "redirect:";
	}
	
	@RequestMapping("/back-from-authorization")
	public ModelAndView callback() {
		ModelAndView mav = new ModelAndView("back");
		return mav;
	}
	
	
	
}
