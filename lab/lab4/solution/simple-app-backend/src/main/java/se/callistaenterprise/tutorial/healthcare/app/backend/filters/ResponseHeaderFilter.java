package se.callistaenterprise.tutorial.healthcare.app.backend.filters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

public class ResponseHeaderFilter implements Filter {

	@Override
	public void destroy() {
	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse resp,
			FilterChain chain) throws IOException, ServletException {
        HttpServletResponse response = (HttpServletResponse) resp;
        // Set some CORS Access control headers
        // For development we can allow all origins="*" or file:// origin = "null" (change this to the server who hosts your javascript)
        response.setHeader("Access-Control-Allow-Origin", "null");
        // For Cross Origin Resource Sharing we allow GETs and POSTs
        response.setHeader("Access-Control-Allow-Methods", "GET,POST");
        // For Cross Origin Resource Sharing we allow these headers
        response.setHeader("Access-Control-Allow-Headers", "x-requested-with, origin, authorization, accept");
        chain.doFilter(req, resp);
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
	}

}
