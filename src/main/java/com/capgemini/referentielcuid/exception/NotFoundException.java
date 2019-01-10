package com.capgemini.referentielcuid.exception;



import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	
	public NotFoundException(String s) {	
		super(s);
		Logger logger = LoggerFactory.getLogger(ConflictException.class);
		logger.error("----------- NOT FOUND EXCEPTION -----------");
		logger.error(s);
	}
}
