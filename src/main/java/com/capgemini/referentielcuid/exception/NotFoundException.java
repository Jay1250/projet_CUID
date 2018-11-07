package com.capgemini.referentielcuid.exception;

import java.util.logging.Logger;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	
	public NotFoundException(String s) {	
		super(s);
		Logger logger = Logger.getLogger("logger");
		logger.info("----------- NOT FOUND EXCEPTION -----------");
		logger.info(s);
	}
}
