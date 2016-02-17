#!/usr/bin/env bash

#
# System-wide .profile for sh(1)
#
if [ -x /usr/libexec/path_helper ]; then
    eval `/usr/libexec/path_helper -s`
fi

if [ "${BASH-no}" != "no" ]; then
    [ -r /etc/bashrc ] && . /etc/bashrc
fi

#
# Execute iStats command
# 
if [ -n "$(which iStats)" ]; then
    # define command
    command=( "$(which iStats)" )

    # execute
    "${command[@]}"
fi