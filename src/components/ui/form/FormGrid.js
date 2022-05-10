import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';

const FormGrid = ({
  register,
  errors,
  validationSchema,
  control,
  children,
  ...rest
}) => {
  return (
    <Grid {...rest}>
      {React.Children.map(children, (child) => {
        const {
          area,
          colEnd,
          colSpan,
          colStart,
          rowEnd,
          rowSpan,
          rowStart,
          ...childProps
        } = child.props;
        const gridItemProps = {
          area,
          colEnd,
          colSpan,
          colStart,
          rowEnd,
          rowSpan,
          rowStart,
        };
        return (
          <GridItem {...gridItemProps}>
            {child.props.name
              ? React.createElement(child.type, {
                  ...{
                    ...childProps,
                    register,
                    control,
                    errors,
                    required:
                      validationSchema.fields[child.props.name]?.exclusiveTests
                        .required,
                    key: child.props.name,
                  },
                })
              : child}
          </GridItem>
        );
      })}
    </Grid>
  );
};

export default FormGrid;
