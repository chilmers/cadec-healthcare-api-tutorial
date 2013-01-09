package se.callistaenterprise.tutorial.healthcare.app.backend.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("")
public class LoginController {

	/**
	 * Renders the login dialog
	 * @return the view name of the login dialog
	 */
	@RequestMapping("/login")
	public String loginDialog() {
		return "login";
	}
	
	@RequestMapping(value="/loginfailed")
	public String loginerror(ModelMap model) {
		model.addAttribute("error", "true");
		return "login";
	}
 
	@RequestMapping(value="/logout")
	public String logout(ModelMap model) {
		return "login";
	}
	
}
