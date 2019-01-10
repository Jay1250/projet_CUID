package com.capgemini.referentielcuid.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class BadRequestException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public BadRequestException(String s) {	
		super(s);
		Logger logger = LoggerFactory.getLogger(ConflictException.class);
		logger.error("----------- BAD REQUEST EXCEPTION -----------");
		logger.error(s);
	}
}
