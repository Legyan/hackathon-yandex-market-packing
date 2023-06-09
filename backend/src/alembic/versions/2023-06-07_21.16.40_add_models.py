"""add models

Revision ID: fa96458f5f63
Revises: 
Create Date: 2023-06-07 21:16:40.389135

"""
import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision = 'fa96458f5f63'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('orders',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('orderkey', sa.String(length=50), nullable=False),
    sa.Column('status', sa.Enum('FORMING', 'COLLECT', 'WAITING', 'PROPOSED', 'COLLECTED', name='orderstatusenum'), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('orderkey')
    )
    op.create_table('products',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('sku', sa.String(length=100), nullable=False),
    sa.Column('title', sa.String(length=200), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('image', sa.Text(), nullable=True),
    sa.Column('need_imei', sa.Boolean(), nullable=False),
    sa.Column('need_honest_sign', sa.Boolean(), nullable=False),
    sa.Column('cargotype', sa.String(length=10), nullable=False),
    sa.Column('weight', sa.Float(), nullable=True),
    sa.Column('lenght', sa.Float(), nullable=True),
    sa.Column('width', sa.Float(), nullable=True),
    sa.Column('height', sa.Float(), nullable=True),
    sa.Column('price', sa.Integer(), nullable=True),
    sa.Column('count', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('cargotype'),
    sa.UniqueConstraint('sku'),
    sa.UniqueConstraint('title')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('order_products',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('orderkey', sa.String(length=50), nullable=False),
    sa.Column('sku', sa.String(length=100), nullable=False),
    sa.Column('count', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['orderkey'], ['orders.orderkey'], ),
    sa.ForeignKeyConstraint(['sku'], ['products.sku'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('order_products')
    op.drop_table('users')
    op.drop_table('products')
    op.drop_table('orders')
    # ### end Alembic commands ###
